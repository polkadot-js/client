// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const key = require('@polkadot/client-db/key');

const { BEST_HASH } = require('./prefix');

module.exports = function getBestHash (db: WrapDbInterface): Uint8Array {
  return db.get(key(BEST_HASH));
};
