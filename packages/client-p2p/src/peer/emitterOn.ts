// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, PeerInterface$Events } from '../types';
import { PeerState } from './types';

type EmitterOn = (PeerInterface$Events, (message: MessageInterface) => void) => void;

export default function emitterOn (self: PeerState): EmitterOn {
  return (type: PeerInterface$Events, cb: (message: MessageInterface) => void): void => {
    self.emitter.on(type, cb);
  };
}
