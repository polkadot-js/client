// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { HandlersType, RpcInterface, RpcInterface$Events } from './types';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('rpc');

const validateConfig = require('./validate/config');
const validateHandlers = require('./validate/handlers');

const start = require('./start');
const stop = require('./stop');

module.exports = function server (config: ConfigType, chain: ChainInterface, handlers: HandlersType, autoStart?: boolean = true): RpcInterface {
  const emitter = new EventEmitter();
  const self = {
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
    // flowlint-next-line unclear-type:off
    on: (type: RpcInterface$Events, cb: () => any): any =>
      self.emitter.on(type, cb),
    start: (): Promise<boolean> =>
      start(self),
    stop: (): Promise<boolean> =>
      stop(self)
  };
};
