// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$CurrentEra } from './types';

const { CURRENT_ERA } = require('./keys');

module.exports = function currentEra (db: WrapDbInterface): ChainDb$State$Staking$CurrentEra {
  return {
    set: (era: BN | number): void =>
      db.setBn64(CURRENT_ERA(), era)
  };
};
