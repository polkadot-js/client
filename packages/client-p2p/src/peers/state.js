// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeersState } from './types';

const EventEmitter = require('eventemitter3');
const l = require('@polkadot/util/logger')('p2p/peers');

module.exports = function state (): PeersState {
  return {
    emitter: new EventEmitter(),
    l,
    peers: {}
  };
};
