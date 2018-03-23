// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '../types';

type Wrap = (key: Uint8Array) => BN;

const u8aToBn = require('@polkadot/util/u8a/toBn');

module.exports = function getBn (db: BaseDbInterface): (bitLength?: number) => Wrap {
  return (bitLength: number = -1): Wrap => {
    return (key: Uint8Array): BN =>
      u8aToBn(db.get(key), true);
  };
};
