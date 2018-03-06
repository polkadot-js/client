// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';
import type { Handlers } from '../types';

export type RpcState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  handlers: Handlers,
  l: Logger,
  server: ?net$Server
};
