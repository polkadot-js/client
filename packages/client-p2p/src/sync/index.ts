// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { BlockAttr, BlockResponseMessage, BlockResponseMessageBlock } from '@polkadot/client-p2p-messages/types';
import { Logger } from '@polkadot/util/types';
import { PeerInterface, SyncStatus } from '../types';
import { SyncInterface, SyncState$Request, SyncState$BlockRequests, SyncState$BlockQueue } from './types';

import BN from 'bn.js';
import E3 from 'eventemitter3';
import BlockRequest from '@polkadot/client-p2p-messages/BlockRequest';
import BlockResponse from '@polkadot/client-p2p-messages/BlockResponse';
import decodeBlock from '@polkadot/primitives/codec/block/decodeRaw';
import isU8a from '@polkadot/util/is/u8a';
import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

import defaults from '../defaults';

type Requests = Array<SyncState$Request>;

export default class Sync extends E3.EventEmitter implements SyncInterface {
  private chain: ChainInterface;
  private l: Logger;
  private blockRequests: SyncState$BlockRequests = {};
  private blockQueue: SyncState$BlockQueue = {};
  status: SyncStatus = 'Idle';

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.chain = chain;
    this.l = logger('sync');
  }

  getBlockData (fields: Array<BlockAttr>, hash: Uint8Array): BlockResponseMessageBlock {
    const { body, header } = decodeBlock(
      this.chain.blocks.block.get(hash)
    );
    const data: BlockResponseMessageBlock = {
      // hash
    } as BlockResponseMessageBlock;

    // if (fields.includes('Body')) {
    //   data.body = body;
    // }

    // if (fields.includes('Header')) {
    //   data.header = header;
    // }

    return data;
  }

  peerRequests (peer: PeerInterface): Requests {
    const requests: Requests = Object.values(this.blockRequests);

    return requests.filter(({ peer: { id } }) =>
      peer.id === id
    );
  }

  processBlocks () {
    const start = Date.now();
    const bestNumber = this.chain.blocks.bestNumber.get();
    const startNumber = bestNumber.addn(1);
    let nextNumber = startNumber;
    let count = 0;

    while (this.blockQueue[nextNumber.toString()]) {
      const { encoded } = this.blockQueue[nextNumber.toString()];

      // this.l.debug(() => `Importing block #${nextNumber.toString()}`);

      if (!this.chain.executor.importBlock(encoded)) {
        break;
      }

      delete this.blockQueue[nextNumber.toString()];

      count++;
      nextNumber = nextNumber.addn(1);
    }

    if (count) {
      this.l.log(`#${startNumber.toString()}- ${count} imported (${Date.now() - start}ms)`);
      this.emit('imported');
    }

    this.status = (count > 1)
      ? 'Sync'
      : 'Idle';
  }

  provideBlocks (peer: PeerInterface, request: BlockRequest) {
    const current = (request.from as BN);
    const best = this.chain.blocks.bestNumber.get();
    const blocks = [];

    // FIXME: Also send blocks starting with hash
    const max = Math.min(request.max || defaults.MAX_SYNC_BLOCKS, defaults.MAX_SYNC_BLOCKS);
    let count = isU8a(request.from) ? max : 0;
    const increment = request.direction === 'Ascending' ? new BN(1) : new BN(-1);

    while (count < max && current.lte(best) && !current.isNeg()) {
      const hash = this.chain.state.system.blockHashAt.get(current);

      blocks.push(
        this.getBlockData(request.fields, hash)
      );

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

  queueBlocks (peer: PeerInterface, { blocks, id }: BlockResponseMessage) {
    const request = this.blockRequests[peer.id];

    delete this.blockRequests[peer.id];

    if (!request || request.request.id !== id) {
      this.l.error(`Mismatched response from ${peer.shortId}`);
      return;
    }

    let count = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const data = this.chain.blocks.block.get(block.hash);
      const hasImported = data.length !== 0;
      const blockNumber = block.header.number.toString();
      const hasQueued = !!this.blockQueue[blockNumber];

      if (hasImported && hasQueued) {
        // we have it
      } else {
        this.blockQueue[blockNumber] = block;

        count++;
      }
    }

    this.l.log(`Queued ${count} blocks from ${peer.shortId}`);

    this.processBlocks();
  }

  requestBlocks (peer: PeerInterface) {
    const bestNumber = this.chain.blocks.bestNumber.get();
    const from = bestNumber.addn(1);

    // TODO: This assumes no stale block downloading
    if (this.blockRequests[peer.id] || from.gt(peer.bestNumber)) {
      return;
    }

    const request = new BlockRequest({
      from,
      id: peer.getNextId()
    });

    this.l.debug(() => `Requesting blocks from ${peer.shortId}, #${from.toString()} -`);

    this.blockRequests[peer.id] = {
      peer,
      request
    };

    peer.send(request);
  }
}
