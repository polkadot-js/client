// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { DbKeygen, WrapDbInterface } from '@polkadot/client-db/types';
import type { KeyNoneValBn } from '../types';

module.exports = function kNvB (bitLength: number): (db: WrapDbInterface, keyGen: DbKeygen) => KeyNoneValBn {
  return (db: WrapDbInterface, keyGen: DbKeygen): KeyNoneValBn => {
    return {
      get: (): BN =>
        db.getBn(keyGen(), bitLength),
      set: (value: number | BN): void =>
        db.setBn(keyGen(), value, bitLength)
    };
  };
};
