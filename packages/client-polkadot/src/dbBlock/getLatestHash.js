// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const key = require('../dbstate/key');
const { LATEST_HASH } = require('./prefix');

module.exports = function getLatestHash (db: BaseDbInterface): Uint8Array {
  return db.get(
    key(LATEST_HASH)
  );
};
