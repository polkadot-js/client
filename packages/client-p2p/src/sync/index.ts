// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { PeerInterface, SyncStatus } from '../types';
import { SyncInterface, SyncState$Request, SyncState$BlockRequests, SyncState$BlockQueue } from './types';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import { BlockRequest, BlockResponse } from '@polkadot/client-types/messages';
import { BlockNumber } from '@polkadot/types';
import { isU8a, logger } from '@polkadot/util';

import defaults from '../defaults';

type Requests = Array<SyncState$Request>;

const REQUEST_TIMEOUT = 60000;

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

  provideBlocks (peer: PeerInterface, request: BlockRequest) {
    const current = request.from.value as BlockNumber;
    const best = this.chain.blocks.bestNumber.get();
    const blocks: Array<any> = [];

    // FIXME: Also send blocks starting with hash
    const max = Math.min(request.max.toNumber() || defaults.MAX_REQUEST_BLOCKS, defaults.MAX_REQUEST_BLOCKS);
    let count = isU8a(request.from) ? max : 0;
    const increment = request.direction.toString() === 'Ascending' ? new BN(1) : new BN(-1);

    while (count < max && current.lte(best) && !current.isNeg()) {
      count++;
      current.iadd(increment);
    }

    peer.send(
      new BlockResponse({
        blocks,
        id: request.id
      })
    );
  }

  queueBlocks (peer: PeerInterface, { blocks, id }: BlockResponse) {
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
