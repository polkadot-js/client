// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Db$Pairs } from '../types';
import type { Memory$Storage } from './types';

const del = require('./del');
const set = require('./set');

module.exports = function commit (storage: Memory$Storage, values: Db$Pairs): void {
  values.forEach(({ key, value }) => {
    if (value && value.length) {
      set(storage, key, value);
    } else {
      del(storage, value);
    }
  });
};
