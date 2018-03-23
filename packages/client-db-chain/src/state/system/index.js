// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System } from './types';

const blockHash = require('./blockHash');
const code = require('./code');
const nonce = require('./nonce');

module.exports = function system (db: WrapDbInterface): ChainDb$State$System {
  return {
    blockHash: blockHash(db),
    code: code(db),
    nonce: nonce(db)
  };
};
