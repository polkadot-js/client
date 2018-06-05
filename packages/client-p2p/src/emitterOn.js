// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, P2pInterface$Events } from './types';

type EmitterOn = (type: P2pInterface$Events, () => void) => void

module.exports = function emitterOn (self: P2pState): EmitterOn {
  return (type: P2pInterface$Events, cb: () => void): void => {
    self.emitter.on(type, cb);
  };
};
