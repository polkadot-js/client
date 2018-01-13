// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const syncify = require('@polkadot/util/syncify');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const u8aToUtf8 = require('@polkadot/util/u8a/toUtf8');

module.exports = function get (storage: DbInterface, key: Uint8Array, maxLength: number): Uint8Array {
  const data = bufferToU8a(
    syncify(
      storage.get(
        u8aToUtf8(key)
      )
    )
  );
  const dataLength = data.length < maxLength
    ? data.length
    : maxLength;

  return data.subarray(0, dataLength);
};
