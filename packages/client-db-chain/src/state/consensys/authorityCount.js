// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Consensys$AuthorityCount } from './types';

const { AUTHORITY_LENGTH } = require('./keys');

module.exports = function authorityCount (db: WrapDbInterface): ChainDb$State$Consensys$AuthorityCount {
  return {
    get: (): BN =>
      db.getBn32(AUTHORITY_LENGTH()),
    set: (count: BN | number): void =>
      db.setBn32(AUTHORITY_LENGTH(), count)
  };
};
