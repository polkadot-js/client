// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import Status from '@polkadot/client-p2p-messages/Status';

// TODO: We should check the genesisHash here and act appropriately
function handleStatus (self: P2pInterface, peer: PeerInterface, message: Status): void {
  self.l.debug(() => [peer.shortId, 'Status', JSON.stringify(message.encode())]);

  const { bestHash, bestNumber } = message;

  peer.setBest(bestNumber, bestHash);
}

(handleStatus as Handler).type = Status.type;

export default (handleStatus as Handler);
