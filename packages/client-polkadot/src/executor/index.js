// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { PolkadotBlock } from '@polkadot/primitives/block';
import type { BlockHeaderType } from '@polkadot/primitives/blockHeader';
import type { PolkadotUnchecked } from '@polkadot/primitives/transaction';
import type { ChainExecutor } from '../types';
import type { CallResult } from './types';

const createWasm = require('@polkadot/client-wasm');

const proxy = require('../wasm/proxy_polkadot_wasm');
const executeBlock = require('./executeBlock');
const executeTransaction = require('./executeTransaction');

module.exports = function executor (config: ConfigType, runtime: RuntimeInterface, code: Uint8Array): ChainExecutor {
  const createInstance = (): WebAssemblyInstance$Exports =>
    createWasm(config, runtime, code, proxy);

  return {
    executeBlock: (block: PolkadotBlock): CallResult =>
      executeBlock(createInstance(), runtime, block),
    executeTransaction: (header: BlockHeaderType, utx: PolkadotUnchecked): CallResult =>
      executeTransaction(createInstance(), runtime, header, utx)
  };
};
