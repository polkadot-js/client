// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessage } from '../message/types';
import { P2pState, PeerInterface } from '../types';

import blockRequest from '../message/blockRequest';

export default function requestBlocks (self: P2pState, peer: PeerInterface): void {
  const from = self.chain.blocks.bestNumber.get().addn(1);

  // TODO: This assumes no stale block downloading
  if (self.sync.blockRequests[peer.id] || from.gt(peer.getBestNumber())) {
    return;
  }

  self.l.debug(() => `Requesting blocks from ${peer.shortId}, #${from.toString()} -`);

  const request = blockRequest({
    from,
    id: peer.getNextId()
  } as BlockRequestMessage);

  self.sync.blockRequests[peer.id] = {
    peer,
    request: (request.raw as BlockRequestMessage)
  };

  peer.send(request);
}
