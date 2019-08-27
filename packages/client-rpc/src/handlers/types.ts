// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';

export type Handler = (...params: any[]) => Promise<any>;

export type Handlers = {
  [index: string]: Handler
};

export type HandlersFactory = (config: Config, chain: ChainInterface) => Handlers;

export type Endpoint = {
  [index: string]: Handler
};
