// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Db$Pairs } from '../types';
import type { Memory$Storage } from './types';

module.exports = function pairs (storage: Memory$Storage): Db$Pairs {
  return Object
    .keys(storage)
    .map((key) => storage[key]);
};
