// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

module.exports = function get (storage: RuntimeEnv$Storage, key: Uint8Array, maxLength: number): Uint8Array {
  const data = storage.get(key);
  const dataLength = data.length < maxLength
    ? data.length
    : maxLength;

  return data.subarray(0, dataLength);
};
