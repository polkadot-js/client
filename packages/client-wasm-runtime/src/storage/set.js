// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const syncify = require('@polkadot/util/syncify');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const u8aToUtf8 = require('@polkadot/util/u8a/toUtf8');

module.exports = function set (storage: DbInterface, key: Uint8Array, data: Uint8Array): void {
  syncify(
    storage.put(
      u8aToUtf8(key),
      u8aToBuffer(data)
    )
  );
};
