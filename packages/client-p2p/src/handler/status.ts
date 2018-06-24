// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { StatusMessage } from '../message/types';
import { P2pState, MessageInterface, PeerInterface } from '../types';

import message from '../message/status';

// TODO: We should check the genesisHash here and act appropriately
export default function handleStatus (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'Status', JSON.stringify(message.encode().message)]);

  const { bestHash, bestNumber } = (message.raw: StatusMessage);

  peer.setBest(bestNumber, bestHash);
}

handleStatus.TYPE = message.TYPE;
