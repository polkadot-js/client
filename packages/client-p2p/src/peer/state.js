// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeerState } from './types';

const BN = require('bn.js');
const EventEmitter = require('eventemitter3');
const pushable = require('pull-pushable');
const l = require('@polkadot/util/logger')('p2p/peer');

module.exports = function state (): PeerState {
  return {
    bestHash: new Uint8Array([]),
    bestNumber: new BN(0),
    connections: [],
    emitter: new EventEmitter(),
    l,
    nextId: 0,
    pushable: pushable()
  };
};
