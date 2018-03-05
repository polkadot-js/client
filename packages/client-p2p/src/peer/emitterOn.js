// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface$Events } from '../types';
import type { PeerState } from './types';

// flowlint-next-line unclear-type:off
type EmitterOn = (PeerInterface$Events, (message: MessageInterface) => any) => any;

module.exports = function emitterOn (self: PeerState): EmitterOn {
  // flowlint-next-line unclear-type:off
  return (type: PeerInterface$Events, cb: (message: MessageInterface) => any): any =>
    self.emitter.on(type, cb);
};
