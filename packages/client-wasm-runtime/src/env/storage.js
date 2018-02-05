// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv$Storage } from '../types';

// const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
// const TrieNode = require('merkle-patricia-tree/trieNode');
// new TrieNode('leaf', TrieNode.stringToNibbles(key), u8aToBuffer(value))

module.exports = function envStorage (db: DbInterface): RuntimeEnv$Storage {
  const keys = {};
  const values = [];

  return {
    keys: (): Array<string> =>
      Object.keys(keys),
    get: (key: string): Uint8Array =>
      values[keys[key]],
    set: (key: string, value: Uint8Array): void => {
      keys[key] = values.length;
      values.push(value);
    }
  };
};
