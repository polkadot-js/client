// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageMethod, Storage$Key$Values, WrapDb } from '../../types';
import type { Creator } from '../types';

const addressDecode = require('@polkadot/util-keyring/address/decode');

module.exports = function decodeAccountId (createKey: Creator, db: WrapDb): StorageMethod<Uint8Array> {
  return ({
    get: (...keyParams?: Storage$Key$Values): Uint8Array =>
      db.get(createKey(keyParams)),
    set: (value: Uint8Array | string, ...keyParams?: Storage$Key$Values): void =>
      db.set(createKey(keyParams), addressDecode(value))
  }: $Shape<StorageMethod<Uint8Array>>);
};
