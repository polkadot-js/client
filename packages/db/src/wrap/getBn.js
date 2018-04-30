// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '../types';

const u8aToBn = require('@polkadot/util/u8a/toBn');

module.exports = function getn (db: BaseDbInterface, key: Uint8Array, bitLength: number = -1): BN {
  return u8aToBn(db.get(key), true);
};
