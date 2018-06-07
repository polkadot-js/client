// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { TrieDb } from '@polkadot/util-triedb/types';

type Base = {
  del (key: Uint8Array): void,
  get (key: Uint8Array): Uint8Array,
  set (key: Uint8Array, value: Uint8Array): void
}

module.exports = function base (db: TrieDb): Base {
  return {
    del: (key: Uint8Array): void =>
      db.del(key),
    get: (key: Uint8Array): Uint8Array =>
      db.get(key) || new Uint8Array([]),
    set: (key: Uint8Array, value: Uint8Array): void =>
      db.set(key, value)
  };
};
