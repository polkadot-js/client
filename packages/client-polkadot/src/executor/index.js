// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { ChainExecutor } from '../types';

const createWasm = require('@polkadot/client-wasm');

const proxy = require('../wasm/proxy_polkadot_wasm');
const executeBlock = require('./executeBlock');
const executeTransaction = require('./executeTransaction');
const finaliseBlock = require('./finaliseBlock');
const generateBlock = require('./generateBlock');
const importBlock = require('./importBlock');

module.exports = function executor (config: ConfigType, runtime: RuntimeInterface, code: Uint8Array): ChainExecutor {
  const creator = (): WebAssemblyInstance$Exports =>
    createWasm(config, runtime, code, proxy);

  return {
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(creator, runtime, block),
    executeTransaction: (header: Uint8Array, utx: Uint8Array): Uint8Array =>
      executeTransaction(creator, runtime, header, utx),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(creator, runtime, header),
    generateBlock: (number: number, transactions: Array<Uint8Array>, timestamp?: number = Date.now()): Uint8Array =>
      generateBlock(creator, runtime, { number, timestamp, transactions }),
    importBlock: (block: Uint8Array): boolean =>
      importBlock(creator, runtime, block)
  };
};
