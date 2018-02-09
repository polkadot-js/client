// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { RuntimeInterface } from './types';

const createEnv = require('./env');
const chain = require('./chain');
const crypto = require('./crypto');
const io = require('./io');
const memory = require('./memory');
const storage = require('./storage');

module.exports = function runtime (wasmMemory: WebAssembly.Memory, chainInstance: ChainConfigType, dbInstance: BaseDbInterface): RuntimeInterface {
  const env = createEnv(wasmMemory, chainInstance, dbInstance);

  return Object.assign(
    { env }, chain(env), crypto(env), io(env), memory(env), storage(env)
  );
};
