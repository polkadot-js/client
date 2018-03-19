// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';
import type { PeersState } from './types';

const EventEmitter = require('eventemitter3');

module.exports = function state (l: Logger): PeersState {
  return {
    emitter: new EventEmitter(),
    l,
    peers: {}
  };
};
