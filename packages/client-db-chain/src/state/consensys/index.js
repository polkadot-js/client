// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Consensys } from './types';

const { kNv32 } = require('../../getset');
const authority = require('./authority');

const keys = require('./keys');

module.exports = function consensys (db: WrapDbInterface): ChainDb$State$Consensys {
  return {
    authority: authority(db),
    authorityCount: kNv32(db, keys.AUTHORITY_LENGTH)
  };
};
