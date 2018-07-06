// Copyright 2017-2018 @polkadot/client-rpc-handlers authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Handlers } from './types';

import state from './state';
import subscribe from './subscribe';
import system from './system';

export default function handlers (config: Config, chain: ChainInterface): Handlers {
  return {
    ...state(config, chain),
    ...subscribe(config, chain),
    ...system(config, chain)
  };
}
