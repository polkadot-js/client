// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb, StateDb, StorageDef, StateDb$SectionNames } from './types';

const createSection = require('./create/section');
const wrapDb = require('./wrap');

module.exports = function storage (baseDb: BaseDb, definition: StorageDef): StateDb {
  const db = wrapDb(baseDb);

  return Object
    .keys(definition)
    .reduce((result: StateDb, name: StateDb$SectionNames): StateDb => {
      result[name] = createSection(definition[name], db);

      return result;
    }, { db });
};
