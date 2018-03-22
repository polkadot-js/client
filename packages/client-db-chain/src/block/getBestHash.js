// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const { BEST_HASH } = require('./keys');

module.exports = function getBestHash (db: WrapDbInterface): Uint8Array {
  return db.get(BEST_HASH());
};
