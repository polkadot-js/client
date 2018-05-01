// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageMethod, StorageDef$Key$Values, StorageDef$Key, WrapDb } from '../types';

const bindKey = require('../key');
const methodBn = require('./methodBn');
const methodU8a = require('./methodU8a');

module.exports = function expandKey (key: StorageDef$Key, db: WrapDb): StorageMethod {
  const keyCreator = bindKey(key);
  const createKey = (keyParams?: StorageDef$Key$Values = []): Uint8Array =>
    keyCreator.apply(null, keyParams);

  return ['Balance', 'BlockNumber', 'u32', 'u64'].includes(key.type)
    ? methodBn(key, createKey, db)
    : methodU8a(key, createKey, db);
};
