// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const bufferToU8a = require('@polkadot/util/buffer/toU8a');

module.exports = function root (storage: DbInterface): Uint8Array {
  return bufferToU8a(
    storage.getRoot()
  );
};
