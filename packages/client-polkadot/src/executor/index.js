// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainInterface$Executor } from '@polkadot/client-chains/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { CallType, CallU8aType } from './types';

const createWasm = require('@polkadot/client-wasm');

const proxy = require('../wasm/proxy_polkadot_wasm');
const createCall = require('./call');
const callAsU8a = require('./callAsU8a');
const executeBlock = require('./executeBlock');
const executeTransaction = require('./executeTransaction');
const finaliseBlock = require('./finaliseBlock');
const generateBlock = require('./generateBlock');
const importBlock = require('./importBlock');

module.exports = function executor (config: ConfigType, runtime: RuntimeInterface, code: Uint8Array): ChainInterface$Executor {
  const creator = (name: string): CallType =>
    createCall(
      createWasm(config, runtime, code, proxy),
      runtime, name
    );
  const creatorU8a = (name: string): CallU8aType =>
    callAsU8a(creator(name));

  return {
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(creator, block),
    executeTransaction: (header: Uint8Array, utx: Uint8Array): Uint8Array =>
      executeTransaction(creatorU8a, header, utx),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(creatorU8a, header),
    generateBlock: (number: number, transactions: Array<Uint8Array>, timestamp?: number = Date.now()): Uint8Array =>
      generateBlock(creatorU8a, { number, timestamp, transactions }),
    importBlock: (block: Uint8Array): boolean =>
      importBlock(creatorU8a, block)
  };
};
