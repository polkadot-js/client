// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const { BLOCK_BY_HASH } = require('./keys');

module.exports = function getBlock (db: WrapDbInterface, hash: Uint8Array): Uint8Array {
  return db.get(BLOCK_BY_HASH(hash));
};
