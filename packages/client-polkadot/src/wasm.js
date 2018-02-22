// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ExecutorInstance, WasmStateInstances } from './types';

const proxy = require('@polkadot/client-polkadot/wasm/proxy_polkadot_wasm');

const createWasm = require('@polkadot/client-wasm');
const createFn = require('@polkadot/client-wasm/create/fn');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function wasm (config: ConfigType, state: WasmStateInstances, code: Uint8Array): ExecutorInstance {
  const executor = createWasm(config, state, code, proxy);

  return Object
    .keys(executor.exports)
    .reduce((result, name) => {
      result.exports[name] = !OVERLAYS.includes(name)
        ? executor[name]
        : createFn(executor, name, executor.runtime);

      return result;
    }, { exports: {}, runtime: executor.runtime });
};
