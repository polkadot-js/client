// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StateDb$Section, StorageDef$Section, WrapDb } from '../types';

const expandKey = require('./key');

module.exports = function expandSection (source: StorageDef$Section, db: WrapDb): StateDb$Section {
  return Object
    .keys(source)
    // $FlowFixMe Ok, I give up... SateDb$Section [1] is incompatible with string [2] in the first argument.
    .reduce((result: StateDb$Section, name: string): StateDb$Section => {
      result[name] = expandKey(source[name], db);

      return result;
    }, {});
};