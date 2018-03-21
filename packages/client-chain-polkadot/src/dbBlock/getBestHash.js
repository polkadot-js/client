// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const key = require('@polkadot/client-db/key');

const { BEST_HASH } = require('./prefix');

module.exports = function getBestHash (db: BaseDbInterface): Uint8Array {
  return db.get(
    key(BEST_HASH)
  );
};
