// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Handlers } from './types';

import handleChain from './chain';
import handleState from './state';
import handleSystem from './system';

export default function handlers (config: Config, chain: ChainInterface): Handlers {
  return {
    ...handleChain(config, chain),
    ...handleState(config, chain),
    ...handleSystem(config, chain)
  };
}
