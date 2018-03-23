// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbKeygen, WrapDbInterface } from '@polkadot/client-db/types';
import type { KeyU8aValU8a } from '../types';

module.exports = function kUvU (db: WrapDbInterface, keyGen: DbKeygen): KeyU8aValU8a {
  return {
    get: (id: Uint8Array): Uint8Array =>
      db.get(keyGen(id)),
    set: (id: Uint8Array, value: Uint8Array): void =>
      db.set(keyGen(id), value)
  };
};
