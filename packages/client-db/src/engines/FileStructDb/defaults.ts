// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Allows for 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;

const ENTRY_NUM = 16;
const ENTRY_SIZE = 1 + UINT_SIZE;

// the size of a branch entry, 96 for nibbles, 1,536 for bytes
const HDR_SIZE = ENTRY_NUM * ENTRY_SIZE;
const HDR_SIZE_0 = ENTRY_NUM * HDR_SIZE;

// key calculations
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;

export default {
  ENTRY_NUM,
  ENTRY_SIZE,
  HDR_SIZE,
  HDR_SIZE_0,
  KEY_SIZE,
  KEY_TOTAL_SIZE,
  UINT_SIZE
};
