// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb, StateDb } from '@polkadot/storage/types';

const createDb = require('@polkadot/storage');

const definition = require('./definition');

module.exports = function db (baseDb: BaseDb): StateDb {
  return createDb(baseDb, definition);
};
