// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

const trieRoot = require('@polkadot/client-db/trie/root');

module.exports = function root (storage: RuntimeEnv$Storage): Uint8Array {
  return trieRoot(
    storage.pairs()
  );
};
