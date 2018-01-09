// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const createEnv = require('./env');
const io = require('./io');
const memory = require('./memory');
const storage = require('./storage');

// flowlint-next-line unclear-type:off
module.exports = function runtime (wasmMemory: WebAssembly.Memory, db: DbInterface): { [string]: Function } {
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
