// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, PeerInterface } from '../types';
import { Handler } from './types';

import BlockRequest from '@polkadot/client-p2p-messages/BlockRequest';
import provideBlocks from '../sync/provideBlocks';

function handleBlockRequest (self: P2pState, peer: PeerInterface, message: BlockRequest): void {
  self.l.debug(() => [peer.shortId, 'BlockRequest', JSON.stringify(message.encode())]);

  provideBlocks(self, peer, message);
}

(handleBlockRequest as Handler).type = BlockRequest.type;

export default (handleBlockRequest as Handler);
