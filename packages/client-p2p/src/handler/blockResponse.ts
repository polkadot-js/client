// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockResponseMessage } from '../message/types';
import { P2pState, MessageInterface, PeerInterface } from '../types';
import { Handler } from './types';

import message from '../message/blockResponse';
import queueBlocks from '../sync/queueBlocks';

function handleBlockResponse (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockResponse', JSON.stringify(message.encode().message)]);

  queueBlocks(self, peer, (message.raw as BlockResponseMessage));
}

(handleBlockResponse as Handler).type = message.type;

export default (handleBlockResponse as Handler);
