// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { DbKeygen, WrapDbInterface } from '@polkadot/client-db/types';
import type { KeyBnValU8a } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');

module.exports = function kBvU (bitLength: number): (db: WrapDbInterface, _keyGen: DbKeygen) => KeyBnValU8a {
  return (db: WrapDbInterface, _keyGen: DbKeygen) => {
    const keyGen = (id: BN | number): Uint8Array =>
      _keyGen(bnToU8a(id, bitLength, true));

    return {
      get: (id: BN | number): Uint8Array =>
        db.get(keyGen(id)),
      set: (id: BN | number, value: Uint8Array): void =>
        db.set(keyGen(id), value)
    };
  };
};
