// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// 5 allows for 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
// 4 allows for 4,294,967,296 filesize (* 16 = 68,719,476,736)
// 4 in a header is 2 ^ 30, 1,073,741,824 (67,108,864 keys)
const U32_SIZE = 4;

// the number of entries in a header
const HDR_ENTRY_NUM = 16;

// first byte for the type, followed by offset
const HDR_ENTRY_SIZE = U32_SIZE;

// the size of a branch entry, 24 bytes
const HDR_TOTAL_SIZE = HDR_ENTRY_NUM * HDR_ENTRY_SIZE;

// key calculations
const KEY_DATA_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_DATA_SIZE + U32_SIZE + U32_SIZE;

export default {
  HDR_ENTRY_NUM,
  HDR_ENTRY_SIZE,
  HDR_TOTAL_SIZE,
  KEY_DATA_SIZE,
  KEY_TOTAL_SIZE,
  U32_SIZE
};
