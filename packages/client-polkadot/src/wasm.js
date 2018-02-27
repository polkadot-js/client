// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ExecutorInstance } from '@polkadot/client-wasm/types';

const createRuntime = require('@polkadot/client-runtime');
const createWasm = require('@polkadot/client-wasm');
const createFn = require('@polkadot/client-wasm/create/fn');

const proxy = require('./wasm/proxy_polkadot_wasm');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function wasm (config: ConfigType, chain: ChainConfigType, db: BaseDbInterface, code?: Uint8Array = chain.code): ExecutorInstance {
  const runtime = createRuntime(chain, db);
  const instance = createWasm(config, runtime, code, proxy);

  return Object
    .keys(instance)
    .reduce((result, name) => {
      result.instance[name] = !OVERLAYS.includes(name)
        ? instance[name]
        : createFn(instance, name, runtime);

      return result;
    }, { instance: {}, runtime });
};
