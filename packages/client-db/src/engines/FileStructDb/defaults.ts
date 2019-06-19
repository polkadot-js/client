// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// 4 allows for 4,294,967,296 (* 16 = 68,719,476,736)
export const U32_SIZE = 4;

// key calculations
export const KEY_DATA_SIZE = 32;
export const KEY_TOTAL_SIZE = KEY_DATA_SIZE + U32_SIZE + U32_SIZE;

// the size of the parts
// const KEY_PARTS_SIZE = ((KEY_DATA_SIZE - 1) * 2) + 1; // 16 entries = nibbles
export const KEY_PARTS_SIZE = KEY_DATA_SIZE * 2; // 16 entries = nibbles

// the number of entries in a header
export const HDR_ENTRY_NUM = 16; // 16 = 4 bits

// first byte for the type, followed by offset
export const HDR_ENTRY_SIZE = U32_SIZE;

// the size of a branch entry
export const HDR_TOTAL_SIZE = HDR_ENTRY_NUM * HDR_ENTRY_SIZE;

// bits for flagging
export const BITS_F = 0b10000000000000000000000000000000;
export const BITS_U = 0b01111111111111111111111111111111;
