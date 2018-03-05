// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pInterface$Events } from '../types';
import type { P2pState } from './types';

// flowlint-next-line unclear-type:off
type EmitterOn = (type: P2pInterface$Events, () => any) => any

module.exports = function emitterOn (self: P2pState): EmitterOn {
  // flowlint-next-line unclear-type:off
  return (type: P2pInterface$Events, cb: () => any): any =>
    self.emitter.on(type, cb);
};
