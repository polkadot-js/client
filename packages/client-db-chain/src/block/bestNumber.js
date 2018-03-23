// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$Block$BestNumber } from './types';

const { BEST_NUMBER } = require('./keys');

module.exports = function bestNumber (db: WrapDbInterface): ChainDb$Block$BestNumber {
  return {
    get: (): BN =>
      db.getBn64(BEST_NUMBER()),
    set: (number: BN | number): void =>
      db.setBn64(BEST_NUMBER(), number)
  };
};
