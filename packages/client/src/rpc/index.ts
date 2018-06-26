// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RpcInterface } from '@polkadot/client-rpc/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '../types';

import createRpc from '@polkadot/client-rpc/index';

import state from './state';
import subscribe from './subscribe';
import system from './system';

export default function rpc (config: Config, chain: ChainInterface): RpcInterface {
  return createRpc(config, chain, {
    ...state(config, chain),
    ...subscribe(config, chain),
    ...system(config, chain)
  });
}
