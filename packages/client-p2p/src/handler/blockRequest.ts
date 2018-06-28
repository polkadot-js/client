// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessage } from '../message/types';
import { P2pState, MessageInterface, PeerInterface } from '../types';
import { Handler } from './types';

import message from '../message/blockRequest';
import provideBlocks from '../sync/provideBlocks';

function handleBlockRequest (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockRequest', JSON.stringify(message.encode().message)]);

  provideBlocks(self, peer, (message.raw as BlockRequestMessage));
}

(handleBlockRequest as Handler).type = message.type;

export default (handleBlockRequest as Handler);
