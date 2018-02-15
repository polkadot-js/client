// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { WasmStateInstances } from './types';

const createRuntime = require('@polkadot/client-wasm-runtime');

const createExports = require('./create/exports');
const createFn = require('./create/fn');
const createMemory = require('./create/memory');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function polkadot ({ wasm: { memoryInitial, memoryMaximum } }: ConfigType, state: WasmStateInstances, polkadotCode: Uint8Array, { imports, exports }: { [string]: Uint8Array
}): WebAssemblyInstance$Exports {
  const memory = createMemory(memoryInitial, memoryMaximum);
  const runtime = createRuntime(memory, state);
  const wasm = createExports(
    createMemory(1, 1), runtime, exports, {
      proxy: createExports(
        memory, runtime, polkadotCode, {
          env: createExports(
            createMemory(1, 1),
            runtime,
            imports
          )
        }
      )
    }
  );

  return Object
    .keys(wasm)
    .reduce((result, name) => {
      result[name] = !OVERLAYS.includes(name)
        ? wasm[name]
        : createFn(wasm, name, runtime);

      return result;
    }, {});
};
