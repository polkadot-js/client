// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Session } from './types';

const length = require('./length');
const value = require('./value');
const valueCount = require('./valueCount');

module.exports = function session (db: WrapDbInterface): ChainDb$State$Session {
  return {
    length: length(db),
    value: value(db),
    valueCount: valueCount(db)
  };
};
