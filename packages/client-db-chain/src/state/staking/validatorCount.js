// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$ValidatorCount } from './types';

const { VALIDATOR_COUNT } = require('./keys');

module.exports = function validatorCount (db: WrapDbInterface): ChainDb$State$Staking$ValidatorCount {
  return {
    get: (): BN =>
      db.getBn64(VALIDATOR_COUNT()),
    set: (count: BN | number): void =>
      db.setBn64(VALIDATOR_COUNT(), count)
  };
};
