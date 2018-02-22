// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

module.exports = function get (storage: BaseDbInterface, key: Uint8Array, maxLength: number = -1): Uint8Array {
  const data = storage.get(key);
  const dataLength = maxLength === -1 || data.length < maxLength
    ? data.length
    : maxLength;

  return data.subarray(0, dataLength);
};
