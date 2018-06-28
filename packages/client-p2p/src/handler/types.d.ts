// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, MessageInterface, PeerInterface } from '../types';

export type Handler = {
  (self: P2pState, peer: PeerInterface, message: MessageInterface): void,
  type: number
};
