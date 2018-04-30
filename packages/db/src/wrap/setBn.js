// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const isU8a = require('@polkadot/util/is/u8a');

module.exports = function setBn (db: BaseDbInterface, key: Uint8Array, value: Uint8Array | BN | number, bitLength: number = -1): void {
  return db.set(
    key,
    isU8a(value)
      ? value
      // $FlowFixMe as above
      : bnToU8a(value, bitLength, true)
  );
};
