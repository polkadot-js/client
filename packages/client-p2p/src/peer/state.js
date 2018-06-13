// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { PeerState } from './types';

const BN = require('bn.js');
const EventEmitter = require('eventemitter3');
const l = require('@polkadot/util/logger')('p2p/peer');

module.exports = function state (config: Config, chain: ChainInterface): PeerState {
  return {
    bestHash: new Uint8Array([]),
    bestNumber: new BN(0),
    chain,
    config,
    connections: [],
    emitter: new EventEmitter(),
    l,
    nextId: 0
  };
};
