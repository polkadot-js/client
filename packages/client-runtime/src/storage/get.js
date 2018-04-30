// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/storage/types';

module.exports = function get (db: BaseDb, key: Uint8Array, maxLength: number = -1): Uint8Array {
  const data = db.get(key);
  const dataLength = maxLength === -1 || data.length < maxLength
    ? data.length
    : maxLength;

  return dataLength === 0
    ? new Uint8Array(maxLength)
    : data.subarray(0, dataLength);
};
