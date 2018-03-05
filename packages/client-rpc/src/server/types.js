// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { ConfigType } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';
import type { HandlersType } from '../types';

export type RpcState = {
  chain: ChainInterface,
  config: ConfigType,
  emitter: EventEmitter,
  handlers: HandlersType,
  l: Logger,
  server: ?net$Server
};
