// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Allows for 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;

// the number of entries in a header
const HDR_ENTRY_NUM = 4;

// the number of header files
const HDR_FILE_NUM = 16;

// first byte fot the type, followed by offset
const HDR_ENTRY_SIZE = 1 + UINT_SIZE;

// the size of a branch entry, 24 bytes
const HDR_SIZE = HDR_ENTRY_NUM * HDR_ENTRY_SIZE;

// in out first position, 16 values, 96 bytes
const HDR_SIZE_0 = HDR_FILE_NUM * HDR_ENTRY_SIZE;

// key calculations
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;

export default {
  HDR_ENTRY_NUM,
  HDR_FILE_NUM,
  HDR_ENTRY_SIZE,
  HDR_SIZE,
  HDR_SIZE_0,
  KEY_SIZE,
  KEY_TOTAL_SIZE,
  UINT_SIZE
};
