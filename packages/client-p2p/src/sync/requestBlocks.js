// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';
import type { P2pState } from '../server/types';
import type { PeerInterface } from '../types';

const { MAX_SYNC_BLOCKS } = require('../defaults');
const blockRequest = require('../message/blockRequest');
const peerMax = require('./peerMax');

let requestId: number = 0;

module.exports = function requestBlocks (self: P2pState, peer: PeerInterface): void {
  const peerBest = peer.getBestNumber();
  let from = peerMax(self, peer);

  while (from.lt(peerBest)) {
    self.l.debug(() => `Requesting blocks from ${peer.shortId}, #${from.toString()} -`);

    const request = blockRequest({
      from,
      id: ++requestId
    });

    from = from.addn(MAX_SYNC_BLOCKS);

    self.sync.blockRequests.push({
      peerId: peer.id,
      request: (request.raw: BlockRequestMessage)
    });

    peer.send(request);
  }
};
