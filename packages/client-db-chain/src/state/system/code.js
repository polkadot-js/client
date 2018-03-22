// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

type Code = {
  get: () => Uint8Array,
  set: (code: Uint8Array) => void
};

const { CODE } = require('./keys');

module.exports = function code (db: WrapDbInterface): Code {
  return {
    get: (): Uint8Array =>
      db.get(CODE()),
    set: (u8a: Uint8Array): void =>
      db.set(CODE(), u8a)
  };
};
