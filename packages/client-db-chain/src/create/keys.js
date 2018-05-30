// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Items } from '@polkadot/params/types';
import type { Storage$Sections, WrapDb } from '../types';

const expandKey = require('./key');

module.exports = function createSection <T> (source: Section$Items<Storage$Sections>, db: WrapDb): T {
  return Object
    .keys(source)
    .reduce((result: T, name: string): T => {
      result[name] = expandKey(source[name], db);

      return result;
    }, ({}: $Shape<T>));
};
