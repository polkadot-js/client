// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { DbKeygen, WrapDbInterface } from '@polkadot/client-db/types';
import type { KeyU8aValBn } from '../types';

module.exports = function kUv64 (bitLength: number): (db: WrapDbInterface, keyGen: DbKeygen) => KeyU8aValBn {
  return (db: WrapDbInterface, keyGen: DbKeygen): KeyU8aValBn => {
    const getBn = db.getBn(bitLength);
    const setBn = db.setBn(bitLength);

    return {
      get: (id: Uint8Array): BN =>
        getBn(keyGen(id)),
      set: (id: Uint8Array, value: BN | number): void =>
        setBn(keyGen(id), value)
    };
  };
};
