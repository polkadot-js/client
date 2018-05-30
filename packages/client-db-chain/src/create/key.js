// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { StorageMethod, Storage$Key$Values, Storage$Sections, WrapDb } from '../types';

const bindKey = require('../key');
const decode = require('./decode');
const decodeU8a = require('./decode/u8a');

module.exports = function expandKey <T> (key: Section$Item<Storage$Sections>, db: WrapDb): StorageMethod<T> {
  const keyCreator = bindKey(key);
  const createKey = (keyParams?: Storage$Key$Values = []): Uint8Array =>
    keyCreator.apply(null, keyParams);

  // Arrays and tuples are always u8a
  return Array.isArray(key.type)
    ? decodeU8a(createKey, db)
    : decode(key.type, createKey, db);
};
