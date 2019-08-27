// Copyright 2017-2019 @polkadot/client-sync authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { PeerInterface, PeersInterface } from '@polkadot/client-p2p/types';
import { Hash, Header } from '@polkadot/types/interfaces';
import { SyncInterface, SyncState$PeerBlock, SyncState$PeerRequest, SyncStatus } from './types';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import { BlockData } from '@polkadot/client-types';
import { BlockAnnounce, BlockRequest, BlockResponse } from '@polkadot/client-types/messages';
import { BlockRequest$Direction, BlockRequest$From } from '@polkadot/client-types/messages/BlockRequest';
import { isBn, isU8a, logger, u8aToHex } from '@polkadot/util';

import defaults from './defaults';

const REQUEST_TIMEOUT = 60000;
const MAX_REQUEST_BN = new BN(defaults.MAX_REQUEST_BLOCKS);

const l = logger('sync');

export default class Sync extends EventEmitter implements SyncInterface {
  private chain: ChainInterface;
  private config: Config;
  private blockRequests: Map<string, SyncState$PeerRequest> = new Map();
  private blockQueue: Map<string, SyncState$PeerBlock> = new Map();
  private bestQueued: BN = new BN(0);
  private isActive: boolean = false;
  private lastBest: BN = new BN(0);
  private peers: PeersInterface | null;
  bestSeen: BN = new BN(0);
  status: SyncStatus = 'Idle';

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.chain = chain;
    this.config = config;
    this.peers = null;
    this.isActive = true;

    this.setProcessTimeout(false);
  }

  stop () {
    this.isActive = false;
  }

  setPeers (peers: PeersInterface): void {
    this.peers = peers;
  }

  private setProcessTimeout (isFast: boolean = true) {
    setTimeout(async () => {
      try {
        await this.processBlocks();
      } catch (error) {
        // ignore
      }
    }, isFast ? 1 : 100);
  }

  private announce (header: Header) {
    if (header.number.unwrap().lte(this.lastBest) || !this.peers || this.status === 'Sync') {
      return;
    }

    this.lastBest = header.number.unwrap();
    this.peers.peers().forEach((peer) => {
      if (peer.bestNumber.lt(this.lastBest)) {
        peer.send(
          new BlockAnnounce({ header })
        );
      }
    });
  }

  private async processBlocks () {
    const hasOne = await this.processBlock();

    this.setProcessTimeout(hasOne);
  }

  private setStatus (): void {
    this.status = this.blockQueue.size > defaults.MIN_IDLE_BLOCKS
      ? 'Sync'
      : 'Idle';
  }

  private hasBlockData (hash: Uint8Array): boolean {
    const data = this.chain.blocks.blockData.get(hash);

    return !!data && !!data.length;
  }

  private getNextBlock (): SyncState$PeerBlock | null {
    if (!this.isActive) {
      return null;
    }

    let result: SyncState$PeerBlock | null = null;

    this.blockQueue.forEach((queued, blockId) => {
      if (!result) {
        const { block: { header } } = queued;

        if (this.hasBlockData(header.hash)) {
          this.blockQueue.delete(blockId);
        } else if (this.hasBlockData(header.parentHash)) {
          result = queued;
        }
      }
    });

    return result;
  }

  private async processBlock (): Promise<boolean> {
    this.setStatus();

    const nextImportable = this.getNextBlock();

    if (!nextImportable) {
      this.requestOther();

      return false;
    }

    const { blockId, block, peer } = nextImportable;
    const result = this.config.sync === 'full'
      ? await this.chain.executor.importBlock(block)
      : await this.chain.executor.importHeader(block);

    if (!result) {
      return false;
    }

    const queueCount = this.blockQueue.size;

    this.blockQueue.delete(blockId);

    if (queueCount < defaults.MIN_QUEUE_SIZE && !this.blockRequests.get(peer.id)) {
      this.requestBlocks(peer);
    }

    this.announce(block.header);
    this.emit('imported');

    return true;
  }

  private blocksFromHash (count: number, from: Hash, to: Hash | null, increment: BN): Uint8Array[] {
    const data = new BlockData(this.chain.blocks.blockData.get(from));

    // nothing here, just get out gracefully
    if (data.isEmpty) {
      return [];
    }

    return this.blocksFromNumber(count, data.header.number.unwrap(), to, increment);
  }

  private blocksFromNumber (count: number, from: BN, to: Hash | null, increment: BN): Uint8Array[] {
    const best = this.chain.blocks.bestNumber.get();
    const blocks: Uint8Array[] = [];
    let current = from;

    // l.debug(() => `Reading ${count} blocks from #${from} -> ${to}, ${increment} (best #${best})`);

    // get the requested number of blocks, either while not the best or not zero
    // (for ascending and decending respectively)
    while (count && current.lte(best) && !current.isZero()) {
      const hash = this.chain.blocks.hash.get(current);

      // make sure we have a valid hash
      if (!hash.length) {
        break;
      }

      const block = this.chain.blocks.blockData.get(hash);

      // we should have an actual block
      if (!block.length) {
        break;
      }

      blocks.push(block);

      // continue the loop if we have not reached out target
      // (below is the catch all for the various ifs, exiting)
      if (to && to.eq(hash)) {
        break;
      }

      // we have one more, add the increment for the next block
      count--;
      current = current.add(increment);
    }

    return blocks;
  }

  provideBlocks (peer: PeerInterface, request: BlockRequest): void {
    const increment = request.direction.isAscending ? new BN(1) : new BN(-1);
    const count = Math.min(request.max.unwrapOr(MAX_REQUEST_BN).toNumber(), defaults.MAX_REQUEST_BLOCKS);
    const to = request.to.unwrapOr(null);
    const blocks = request.from.isHash
      ? this.blocksFromHash(count, request.from.asHash(), to, increment)
      : this.blocksFromNumber(count, request.from.asBlockNumber(), to, increment);

    l.debug(() => `Providing ${blocks.length} blocks to ${peer.shortId}, ${request.from.toString()}+`);

    peer.send(
      new BlockResponse({
        blocks,
        id: request.id
      })
    );
  }

  queueBlocks (peer: PeerInterface, { blocks, id }: BlockResponse): void {
    const request = this.blockRequests.get(peer.id);
    const bestNumber = this.chain.blocks.bestNumber.get();

    this.blockRequests.delete(peer.id);

    if (!request) {
      // l.warn(`Unrequested response from ${peer.shortId}`);
    } else if (!id.eq(request.request.id)) {
      // l.warn(`Mismatched response from ${peer.shortId}`);
    }

    let firstNumber: BN | null = null;
    let count = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      // console.error(JSON.stringify(block), block.toHex());

      const dbBlock = this.chain.blocks.blockData.get(block.hash);
      const blockNumber = block.header.number.unwrap();
      const blockId = blockNumber.toString();

      if ((dbBlock.length && blockNumber.lte(bestNumber)) || this.blockQueue.get(blockId)) {
        continue;
      }

      this.blockQueue.set(blockId, {
        blockId,
        block,
        peer
      });
      firstNumber = firstNumber || blockNumber;

      if (this.bestQueued.lt(blockNumber)) {
        this.bestQueued = blockNumber;
      }

      count++;
    }

    if (count && firstNumber) {
      l.debug(`Queued ${count} from ${peer.shortId}, #${firstNumber.toString()}+`);
    }

    // this.requestBlocks(peer);
  }

  private requestFromPeer (peer: PeerInterface, from: BN | Uint8Array | null, isStale: boolean) {
    const isFromValid = !isBn(from) || from.lte(peer.bestNumber);

    if (this.blockRequests.get(peer.id) || !peer.isActive() || !from || !isFromValid) {
      return;
    }

    const isHash = isU8a(from);
    const fromStr = isHash
      ? u8aToHex(from as Uint8Array, 48)
      : `#${from.toString()}`;

    l.debug(() => `Requesting from ${peer.shortId}, ${fromStr} ${isStale ? '(older)' : '-'}`);

    const request = new BlockRequest({
      direction: new BlockRequest$Direction(isHash ? 'Descending' : 'Ascending'),
      // fields: new BlockRequest$Fields(
      //   this.config.sync === 'full'
      //     ? ['header', 'body', 'justification']
      //     : ['header']
      // ),
      from: new BlockRequest$From(from, isHash ? 0 : 1),
      id: peer.getNextId(),
      max: defaults.MAX_REQUEST_BLOCKS
    });

    this.blockRequests.set(peer.id, {
      peer,
      request,
      timeout: Date.now() + REQUEST_TIMEOUT
    });

    peer.send(request);
  }

  requestBlocks (peer: PeerInterface) {
    this.timeoutRequests();

    const nextNumber = this.chain.blocks.bestNumber.get().addn(1);
    const from = this.bestQueued.lt(nextNumber)
      ? nextNumber
      : (
        this.bestQueued.sub(nextNumber).ltn(defaults.MIN_QUEUE_SIZE)
          ? this.bestQueued.addn(1)
          : null
      );

    if (peer.bestNumber.gt(this.bestSeen)) {
      this.bestSeen = peer.bestNumber;
    }

    this.requestFromPeer(peer, from, false);
  }

  private requestOther () {
    let result: SyncState$PeerBlock | null = null;

    this.blockQueue.forEach((current) => {
      if (!result || current.block.header.number.unwrap().lt(result.block.header.number.unwrap())) {
        result = current;
      }
    });

    if (!result) {
      return;
    }

    this.requestFromPeer(
      (result as SyncState$PeerBlock).peer,
      (result as SyncState$PeerBlock).block.header.number.unwrap().subn(defaults.MAX_REQUEST_BLOCKS),
      true
    );
  }

  private timeoutRequests (): void {
    const now = Date.now();

    this.blockRequests.forEach((request, key) => {
      if (request.timeout < now) {
        this.blockRequests.delete(key);
      }
    });
  }
}
