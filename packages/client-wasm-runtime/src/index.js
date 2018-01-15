// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeExports } from './types';

const createEnv = require('./env');
const io = require('./io');
const memory = require('./memory');
const storage = require('./storage');

module.exports = function runtime (wasmMemory: WebAssembly.Memory, db: DbInterface): RuntimeExports {
  const env = createEnv(wasmMemory, db);
  const exports = Object.assign(
    {}, io(env), memory(env), storage(env)
  );

  return Object
    .keys(exports)
    .reduce((result, key) => {
      result[`ext_${key}`] = exports[key];

      return result;
    }, {});
};
