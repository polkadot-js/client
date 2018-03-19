// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';
import type { P2pState } from './types';

const EventEmitter = require('eventemitter3');

const syncState = require('./sync/state');

module.exports = function state (l: Logger, config: Config, chain: ChainInterface): P2pState {
  return {
    chain,
    config,
    emitter: new EventEmitter(),
    l,
    // $FlowFixMe
    node: null,
    // $FlowFixMe
    peers: null,
    sync: syncState()
  };
};
