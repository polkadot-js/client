// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Session } from './types';

const { kNv32, kNv64, k32vU } = require('../../getset');

const keys = require('./keys');

module.exports = function session (db: WrapDbInterface): ChainDb$State$Session {
  return {
    length: kNv64(db, keys.SESSION_LENGTH),
    value: k32vU(db, keys.VALUE),
    valueCount: kNv32(db, keys.VALUE_COUNT)
  };
};
