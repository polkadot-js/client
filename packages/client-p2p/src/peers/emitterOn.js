// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeersInterface$Events } from '../types';
import type { PeersState } from './types';

// flowlint-next-line unclear-type:off
type EmitterOn = (type: PeersInterface$Events, cb: (peer: any) => void) => void;

export default function emitterOn (self: PeersState): EmitterOn {
  // flowlint-next-line unclear-type:off
  return (type: PeersInterface$Events, cb: (peer: any) => void): void => {
    self.emitter.on(type, cb);
  };
}
