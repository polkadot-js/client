// Copyright 2017-2018 @polkadot/client-rpc-handlers authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';

export type Handler = (...params: Array<any>) => Promise<any>;

export type Handlers = {
  [index: string]: Handler
};

export type HandlersFactory = (config: Config, chain: ChainInterface) => Handlers

export type Endpoint = {
  [index: string]: Handler
};
