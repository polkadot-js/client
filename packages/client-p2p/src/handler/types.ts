// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from '@polkadot/client-types/messages/types';
import { P2pInterface, PeerInterface } from '../types';

export type Handler = {
  (self: P2pInterface, peer: PeerInterface, message: MessageInterface): void,
  type: number
};
