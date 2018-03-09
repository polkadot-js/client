// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';
import type { P2pState, PeerInterface } from '../types';

const blockRequest = require('../message/blockRequest');

let requestId: number = 0;

module.exports = function requestBlocks (self: P2pState, peer: PeerInterface): void {
  const from = self.chain.blocks.getBestNumber().addn(1);

  // TODO: This assumes no stale block downloading
  if (self.sync.blockRequests[peer.id] || from.gt(peer.getBestNumber())) {
    return;
  }

  self.l.debug(() => `Requesting blocks from ${peer.shortId}, #${from.toString()} -`);

  const request = blockRequest({
    from,
    id: ++requestId
  });

  self.sync.blockRequests[peer.id] = {
    peer,
    request: (request.raw: BlockRequestMessage)
  };

  peer.send(request);
};
