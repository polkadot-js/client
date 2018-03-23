// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbKeygen, WrapDbInterface } from '@polkadot/client-db/types';
import type { KeyNoneValU8a } from '../types';

module.exports = function kNvU (db: WrapDbInterface, keyGen: DbKeygen): KeyNoneValU8a {
  return {
    get: (): Uint8Array =>
      db.get(keyGen()),
    set: (value: Uint8Array): void =>
      db.set(keyGen(), value)
  };
};
