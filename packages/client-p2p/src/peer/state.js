// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';
import type { PeerState } from './types';

const BN = require('bn.js');
const EventEmitter = require('eventemitter3');
const pushable = require('pull-pushable');

module.exports = function state (l: Logger): PeerState {
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
