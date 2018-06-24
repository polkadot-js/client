// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Handlers, RpcInterface, RpcState } from './types';

import E3 from 'eventemitter3';

import logger from '@polkadot/util/logger';

import validateConfig from './validate/config';
import validateHandlers from './validate/handlers';
import emitterOn from './emitterOn';
import start from './start';
import stop from './stop';
import subscriptions from './subscriptions';

const l = logger('rpc');

export default function server (config: Config, chain: ChainInterface, handlers: Handlers, autoStart: boolean = true): RpcInterface {
  const emitter = new E3.EventEmitter();
  const self: RpcState = {
    chain,
    config,
    emitter,
    handlers,
    l,
    servers: [],
    subscribe: subscriptions(chain)
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
}
