// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const trieRoot = require('@polkadot/util-triehash/root');

module.exports = function root (storage: BaseDbInterface): Uint8Array {
  return trieRoot(
    storage.pairs()
  );
};
