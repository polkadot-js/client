// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// to play with files vs header entries,
//   - 16 files, 16 header entries (4 bits each)
//     - KEY_PARTS_SIZE = ((KEY_DATA_SIZE - 1) * 2) + 1
//     - HDR_ENTRY_NUM = 16
//     - HDR_SPLIT_FILES = 16
//   - 64 files, 4 header entries (6 bits, 2 buts)
//     - KEY_PARTS_SIZE = ((KEY_DATA_SIZE - 1) * 4) + 1
//     - HDR_ENTRY_NUM = 4
//     - HDR_SPLIT_FILES = 64

// 4 allows for 4,294,967,296 (* 16 = 68,719,476,736)
const U32_SIZE = 4;

// key calculations
const KEY_DATA_SIZE = 32;
const KEY_PARTS_SIZE = ((KEY_DATA_SIZE - 1) * 4) + 1; // nibbles, 16 entries = 2, 4 entries = 4
const KEY_TOTAL_SIZE = KEY_DATA_SIZE + U32_SIZE + U32_SIZE;

// the number of entries in a header
const HDR_ENTRY_NUM = 4; // 16; // 16 = 4-bits, 4 = 2 bits

// the number of index files
const HDR_SPLIT_FILES = 64; // 16; // 16 = 4 bits, 64 = 6 bits

// first byte for the type, followed by offset
const HDR_ENTRY_SIZE = U32_SIZE;

// the size of a branch entry
const HDR_TOTAL_SIZE = HDR_ENTRY_NUM * HDR_ENTRY_SIZE;

export default {
  HDR_ENTRY_NUM,
  HDR_ENTRY_SIZE,
  HDR_SPLIT_FILES,
  HDR_TOTAL_SIZE,
  KEY_DATA_SIZE,
  KEY_PARTS_SIZE,
  KEY_TOTAL_SIZE,
  U32_SIZE
};
