// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeExports } from './types';

const createEnv = require('./env');
const chain = require('./chain');
const crypto = require('./crypto');
const io = require('./io');
const memory = require('./memory');
const storage = require('./storage');
const trie = require('./trie');

module.exports = function runtime (wasmMemory: WebAssembly.Memory, chainInstance: ChainConfigType, dbInstance: DbInterface): RuntimeExports {
  const env = createEnv(wasmMemory, chainInstance, dbInstance);
  const exports = Object.assign(
    {}, chain(env), crypto(env), io(env), memory(env), storage(env), trie(env)
  );

  return Object
    .keys(exports)
    .reduce((result, key) => {
      result[`ext_${key}`] = exports[key];

      return result;
    }, {});
};
