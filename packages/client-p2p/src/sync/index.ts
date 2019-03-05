// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { PeerInterface, SyncStatus } from '../types';
import { SyncInterface, SyncState$Request, SyncState$BlockRequests, SyncState$BlockQueue } from './types';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import { BlockData } from '@polkadot/client-types/index';
import { BlockRequest, BlockResponse } from '@polkadot/client-types/messages';
import { Hash } from '@polkadot/types';
import { logger } from '@polkadot/util';

import defaults from '../defaults';

type Requests = Array<SyncState$Request>;

const REQUEST_TIMEOUT = 60000;
const MAX_REQUEST_BN = new BN(defaults.MAX_REQUEST_BLOCKS);

const l = logger('sync');

export default class Sync extends EventEmitter implements SyncInterface {
  private chain: ChainInterface;
  private blockRequests: SyncState$BlockRequests = {};
  private blockQueue: SyncState$BlockQueue = {};
  private bestQueued: BN = new BN(0);
  // private lastPeer: PeerInterface | null = null;
  bestSeen: BN = new BN(0);
  status: SyncStatus = 'Idle';

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.chain = chain;

    this.processBlocks();
  }

  // getBlockData (fields: Array<string>, hash: Uint8Array): BlockResponseMessage$Block {
  //   // const { body, header } = decodeBlock(
  //   //   this.chain.blocks.block.get(hash)
  //   // );
  //   const data: BlockResponseMessageBlock = {
  //     // hash
  //   } as BlockResponseMessageBlock;

  //   // if (fields.includes('Body')) {
  //   //   data.body = body;
  //   // }

  //   // if (fields.includes('Header')) {
  //   //   data.header = header;
  //   // }

  //   return data;
  // }

  peerRequests (peer: PeerInterface): Requests {
    const requests: Requests = Object.values(this.blockRequests);

    return requests.filter(({ peer: { id } }) =>
      peer.id === id
    );
  }

  private processBlocks () {
    const hasOne = this.processBlock();

    setTimeout(() => {
      this.processBlocks();
    }, hasOne ? 1 : 100);
  }

  private setStatus (): void {
    this.status = Object.keys(this.blockQueue).length > defaults.MIN_IDLE_BLOCKS
      ? 'Sync'
      : 'Idle';
  }

  private processBlock (): boolean {
    // const start = Date.now();
    const bestNumber = this.chain.blocks.bestNumber.get();
    const nextNumber = bestNumber.addn(1);
    let hasImported = false;

    this.setStatus();

    if (this.blockQueue[nextNumber.toString()]) {
      const { block } = this.blockQueue[nextNumber.toString()];

      l.debug(() => `Importing block #${nextNumber.toString()}`);

      if (!this.chain.executor.importBlock(block)) {
        return false;
      }

      delete this.blockQueue[nextNumber.toString()];

      this.emit('imported');

      hasImported = true;
    }

    return hasImported;
  }

  private blocksFromHash (count: number, from: Hash, to: Hash | null, increment: BN): Array<Uint8Array> {
    const data = new BlockData(this.chain.blocks.blockData.get(from));

    // nothing here, just get out gracefully
    if (data.isEmpty) {
      return [];
    }

    return this.blocksFromNumber(count, data.header.blockNumber, to, increment);
  }

  private blocksFromNumber (count: number, from: BN, to: Hash | null, increment: BN): Array<Uint8Array> {
    const best = this.chain.blocks.bestNumber.get();
    const blocks: Array<Uint8Array> = [];
    let current = from;

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
      if (block.length) {
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
    const to = request.to.isNull
      ? null
      : request.to.asHash();
    const blocks = request.from.isHash
      ? this.blocksFromHash(count, request.from.asHash(), to, increment)
      : this.blocksFromNumber(count, request.from.asBlockNumber(), to, increment);

    peer.send(
      new BlockResponse({
        blocks,
        id: request.id
      })
    );
  }

  queueBlocks (peer: PeerInterface, { blocks, id }: BlockResponse): void {
    const request = this.blockRequests[peer.id];

    delete this.blockRequests[peer.id];

    if (!request) {
      l.warn(`Unrequested response from ${peer.shortId}`);
      return;
    } else if (!id.eq(request.request.id)) {
      // l.warn(`Mismatched response from ${peer.shortId}`);
    }

    const bestNumber = this.chain.blocks.bestNumber.get();
    let firstNumber;
    let count = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const dbBlock = this.chain.blocks.blockData.get(block.hash);
      const header = block.header;
      const queueNumber = header.blockNumber.toString();
      const isImportable = !dbBlock.length || bestNumber.lt(header.blockNumber);
      const canQueue = isImportable && !this.blockQueue[queueNumber];

      if (canQueue) {
        this.blockQueue[queueNumber] = {
          block,
          peer
        };
        firstNumber = firstNumber || header.blockNumber;

        if (this.bestQueued.lt(header.blockNumber)) {
          this.bestQueued = header.blockNumber;
        }

        count++;
      }
    }

    if (count && firstNumber) {
      l.log(`Queued ${count} blocks from ${peer.shortId}, #${firstNumber.toString()}+`);
    }
  }

  requestBlocks (peer: PeerInterface) {
    this.timeoutRequests();

    if (!peer.isActive()) {
      return;
    }

    const nextNumber = this.chain.blocks.bestNumber.get().addn(1);
    const from = this.bestQueued.lt(nextNumber)
      ? nextNumber
      : (
        this.bestQueued.sub(nextNumber).ltn(defaults.MAX_QUEUED_BLOCKS / 2)
          ? this.bestQueued.addn(1)
          : null
      );

    if (peer.bestNumber.gt(this.bestSeen)) {
      this.bestSeen = peer.bestNumber;
    }

    // TODO: This assumes no stale block downloading
    if (this.blockRequests[peer.id] || !from || from.gt(peer.bestNumber)) {
      return;
    }

    l.debug(() => `Requesting blocks from ${peer.shortId}, #${from.toString()} -`);

    const timeout = Date.now() + REQUEST_TIMEOUT;
    const request = new BlockRequest({
      from,
      id: peer.getNextId(),
      max: defaults.MAX_REQUEST_BLOCKS
    });

    this.blockRequests[peer.id] = {
      peer,
      request,
      timeout
    };

    peer.send(request);
  }

  // TODO We can probably use a package with a timeout like an LRU
  private timeoutRequests (): void {
    const now = Date.now();

    this.blockRequests = Object
      .keys(this.blockRequests)
      .filter((id) =>
        this.blockRequests[id].timeout > now
      )
      .reduce((result, id) => {
        result[id] = this.blockRequests[id];

        return result;
      }, {} as SyncState$BlockRequests);
  }
}
