// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, Db } from '@polkadot/db/types';

const createDb = require('@polkadot/db');

const definition = require('./definition');

module.exports = function db (baseDb: BaseDbInterface): Db {
  return createDb(baseDb, definition);
};
