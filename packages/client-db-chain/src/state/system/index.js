// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System } from './types';

const { k64vU, kNvU, kUv64 } = require('../../getset');

const keys = require('./keys');

module.exports = function system (db: WrapDbInterface): ChainDb$State$System {
  return {
    blockHash: k64vU(db, keys.BLOCK_HASH_AT),
    code: kNvU(db, keys.CODE),
    nonce: kUv64(db, keys.NONCE_OF)
  };
};
