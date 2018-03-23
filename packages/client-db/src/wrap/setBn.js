// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '../types';

type Wrap = (key: Uint8Array, value: BN | number) => void;

const bnToU8a = require('@polkadot/util/bn/toU8a');

module.exports = function setBn (db: BaseDbInterface): (bitLength?: number) => Wrap {
  return (bitLength: number = -1): Wrap => {
    return (key: Uint8Array, value: BN | number): void => {
      db.set(key, bnToU8a(value, bitLength, true));
    };
  };
};
