// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System$Code } from './types';

const { CODE } = require('./keys');

module.exports = function code (db: WrapDbInterface): ChainDb$State$System$Code {
  return {
    get: (): Uint8Array =>
      db.get(CODE()),
    set: (u8a: Uint8Array): void =>
      db.set(CODE(), u8a)
  };
};
