// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Session$ValueCount } from './types';

const { VALUE_LENGTH } = require('./keys');

module.exports = function valueCount (db: WrapDbInterface): ChainDb$State$Session$ValueCount {
  return {
    set: (count: BN | number): void =>
      db.setBn32(VALUE_LENGTH(), count)
  };
};
