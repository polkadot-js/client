// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StateDb$Section, StorageDef$Section, WrapDb } from '../types';

const expandKey = require('./key');

module.exports = function expandSection (source: StorageDef$Section, db: WrapDb): StateDb$Section {
  return Object
    .keys(source)
    .reduce((result: StateDb$Section, name: string): StateDb$Section => {
      result[name] = expandKey(source[name], db);

      return result;
    }, {});
};
