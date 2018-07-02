// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, PeerInterface } from '../types';
import { Handler } from './types';

import BlockResponse from '@polkadot/client-p2p-messages/BlockResponse';
import queueBlocks from '../sync/queueBlocks';

function handleBlockResponse (self: P2pState, peer: PeerInterface, message: BlockResponse): void {
  self.l.debug(() => [peer.shortId, 'BlockResponse', JSON.stringify(message.encode())]);

  queueBlocks(self, peer, message);
}

(handleBlockResponse as Handler).type = BlockResponse.type;

export default (handleBlockResponse as Handler);
