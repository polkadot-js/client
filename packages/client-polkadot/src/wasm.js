// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ExecutorInstance } from '@polkadot/client-wasm/types';

const proxy = require('@polkadot/client-polkadot/wasm/proxy_polkadot_wasm');

const createWasm = require('@polkadot/client-wasm');
const createFn = require('@polkadot/client-wasm/create/fn');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function wasm (config: ConfigType, chain: ChainConfigType, db: BaseDbInterface, code: Uint8Array): ExecutorInstance {
  const { instance, runtime } = createWasm(config, chain, db, code, proxy);

  return Object
    .keys(instance)
    .reduce((result, name) => {
      result.instance[name] = !OVERLAYS.includes(name)
        ? instance[name]
        : createFn(instance, name, runtime);

      return result;
    }, { instance: {}, runtime });
};
