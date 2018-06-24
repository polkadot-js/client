// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { PeersInterface$Events } from '../types';
import { PeersState } from './types';

type EmitterOn = (type: PeersInterface$Events, cb: (peer: any) => void) => void;

export default function emitterOn (self: PeersState): EmitterOn {
  return (type: PeersInterface$Events, cb: (peer: any) => void): void => {
    self.emitter.on(type, cb);
  };
}
