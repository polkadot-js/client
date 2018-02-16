// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WasmStateInstances } from '@polkadot/client-wasm/types';
import type { RuntimeInterface, RuntimeInterface$Exports } from './types';

const createChain = require('./chain');
const createCrypto = require('./crypto');
const createEnv = require('./environment');
const createIo = require('./io');
const createMemory = require('./memory');
const createStorage = require('./storage');

module.exports = function runtime (memoryInterface: WebAssembly.Memory, { chain, db }: WasmStateInstances): RuntimeInterface {
  const environment = createEnv(memoryInterface, chain, db);

  return {
    environment,
    exports: (Object.assign(
      // flowlint-next-line unclear-type:off
      ({}: any),
      createChain(environment), createCrypto(environment), createIo(environment), createMemory(environment), createStorage(environment)
    ): $Shape<RuntimeInterface$Exports>)
  };
};
