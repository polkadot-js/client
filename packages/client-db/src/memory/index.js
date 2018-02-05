// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, Db$Pairs } from '../types';
import type { Memory$Storage } from './types';

const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');
const update = require('./update');

module.exports = function memory (): BaseDbInterface {
  const storage: Memory$Storage = {};

  return {
    del: (key: Uint8Array): void =>
      del(storage, key),
    get: (key: Uint8Array): Uint8Array =>
      get(storage, key),
    pairs: (): Db$Pairs =>
      pairs(storage),
    set: (key: Uint8Array, value: Uint8Array): void =>
      set(storage, key, value),
    update: (values: Db$Pairs): void =>
      update(storage, values)
  };
};
