// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Handlers, RpcInterface, RpcState } from './types';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('rpc');

const validateConfig = require('./validate/config');
const validateHandlers = require('./validate/handlers');

const emitterOn = require('./emitterOn');
const start = require('./start');
const stop = require('./stop');

module.exports = function server (config: Config, chain: ChainInterface, handlers: Handlers, autoStart?: boolean = true): RpcInterface {
  const emitter = new EventEmitter();
  const self: RpcState = {
    chain,
    config,
    emitter,
    handlers,
    l,
    server: null
  };

  validateConfig(config.rpc);
  validateHandlers(handlers);

  if (autoStart) {
    start(self);
  }

  return {
    on: emitterOn(self),
    start: (): Promise<boolean> =>
      start(self),
    stop: (): Promise<boolean> =>
      stop(self)
  };
};
