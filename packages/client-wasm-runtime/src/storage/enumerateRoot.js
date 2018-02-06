// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

const trieRootOrdered = require('@polkadot/client-db/trie/rootOrdered');

module.exports = function enumerateRoot (storage: RuntimeEnv$Storage, values: Array<Uint8Array>): Uint8Array {
  return trieRootOrdered(values);
};
