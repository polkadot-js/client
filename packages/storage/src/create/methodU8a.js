// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageMethod, StorageDef$Key$Values, StorageDef$Key, WrapDb } from '../types';
import type { Creator } from './types';

module.exports = function expandMethodU8a (key: StorageDef$Key, createKey: Creator, db: WrapDb): StorageMethod {
  return ({
    get: (...keyParams?: StorageDef$Key$Values): Uint8Array =>
      db.get(createKey(keyParams)),
    set: (value: Uint8Array, ...keyParams?: StorageDef$Key$Values): void =>
      db.set(createKey(keyParams), value)
  }: $Shape<StorageMethod>);
};
