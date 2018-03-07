// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { P2pInterface } from '../types';
import type { P2pState } from './types';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('p2p');

const syncState = require('../sync/state');
const announceBlock = require('./announceBlock');
const emitterOn = require('./emitterOn');
const start = require('./start');
const stop = require('./stop');

module.exports = function server (config: Config, chain: ChainInterface, autoStart: boolean = true): P2pInterface {
  const self: P2pState = {
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

  if (autoStart) {
    start(self);
  }

  return {
    _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array): void =>
      announceBlock(self, hash, header, body),
    isStarted: (): boolean =>
      !!self.node,
    on: emitterOn(self),
    start: (): Promise<boolean> =>
      start(self),
    stop: (): Promise<boolean> =>
      stop(self)
  };
};
