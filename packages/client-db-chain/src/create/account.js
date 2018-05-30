// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { StorageMethod$Account, Storage$Key$Values, WrapDb } from '../types';

const addressDecode = require('@polkadot/util-keyring/address/decode');

const creator = require('./key');

module.exports = function decodeAccountId <T> (key: Section$Item<T>, db: WrapDb): StorageMethod$Account {
  const createKey = creator(key);

  return {
    get: (...keyParams?: Storage$Key$Values): Uint8Array =>
      db.get(createKey(keyParams)),
    set: (value: Uint8Array | string, ...keyParams?: Storage$Key$Values): void =>
      db.set(createKey(keyParams), addressDecode(value))
  };
};
