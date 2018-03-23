// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Session$Length } from './types';

const { SESSION_LENGTH } = require('./keys');

module.exports = function length (db: WrapDbInterface): ChainDb$State$Session$Length {
  return {
    set: (length: BN | number): void =>
      db.setBn64(SESSION_LENGTH(), length)
  };
};
