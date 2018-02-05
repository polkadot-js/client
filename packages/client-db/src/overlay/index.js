// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, Db$Pairs } from '../types';
import type { Memory$Storage } from '../memory/types';

const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');
const update = require('./update');

module.exports = function overlay (backend: BaseDbInterface): BaseDbInterface {
  let pending: Memory$Storage = {};

  return {
    del: (key: Uint8Array): void =>
      del(pending, backend, key),
    get: (key: Uint8Array): Uint8Array =>
      get(pending, backend, key),
    pairs: (): Db$Pairs =>
      pairs(pending, backend),
    set: (key: Uint8Array, value: Uint8Array): void =>
      set(pending, backend, key, value),
    update: (values: Db$Pairs): void => {
      update(pending, backend, values);
      pending = {};
    }
  };
};
