// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import { Bft } from '@polkadot/client-types/messages';

// TODO Propagate
function handleBft (self: P2pInterface, peer: PeerInterface, message: Bft): void {
  // self.l.debug(() => [peer.shortId, 'Bft', JSON.stringify(message)]);
}

(handleBft as Handler).type = Bft.type;

export default (handleBft as Handler);
