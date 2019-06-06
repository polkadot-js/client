// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Allows for 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;

// first byte fot the type, followed by offset
const HDR_ENTRY_SIZE = 1 + UINT_SIZE;

// the size of a branch entry, 96 for nibbles, 1,536 for bytes
const HDR_SIZE = 16 * HDR_ENTRY_SIZE;

// in out first position, cater for 256 values
const HDR_SIZE_0 = 256 * HDR_ENTRY_SIZE;

// key calculations
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;

export default {
  HDR_ENTRY_SIZE,
  HDR_SIZE,
  HDR_SIZE_0,
  KEY_SIZE,
  KEY_TOTAL_SIZE,
  UINT_SIZE
};
