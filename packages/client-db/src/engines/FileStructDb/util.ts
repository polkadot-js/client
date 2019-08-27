// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyParts, ParsedHdr, ParsedKey, ValInfo } from './types';

import { BITS_F, BITS_U, DB_MAX_FILES, HDR_ENTRY_SIZE, HDR_TOTAL_SIZE, KEY_DATA_SIZE, KEY_PARTS_SIZE, KEY_TOTAL_SIZE, U32_SIZE } from './constants';

export function readU32 (u8a: Uint8Array, offset: number): number {
  // reverse the writing, highest bits goes first, lowest are last
  return (u8a[offset] << 24) +
    (u8a[offset + 1] << 16) +
    (u8a[offset + 2] << 8) +
    u8a[offset + 3];
}

export function writeU32 (u8a: Uint8Array, value: number, offset: number): void {
  // write the highest bits first - this way, when flagged, we only need to
  // read a single byte (this is useful in the cases where we re-encode a trie)
  u8a[offset] = (value >> 24) & 0xff;
  u8a[offset + 1] = (value >> 16) & 0xff;
  u8a[offset + 2] = (value >> 8) & 0xff;
  u8a[offset + 3] = value & 0xff;
}

export function modifyHdr (hdr: Uint8Array, hdrIndex: number, linkAt: number, isKey: boolean): Uint8Array {
  writeU32(hdr, isKey ? (linkAt | BITS_F) : linkAt, hdrIndex * HDR_ENTRY_SIZE);

  return hdr;
}

export function modifyKey (keyData: Uint8Array, valAt: number, valSize: number): Uint8Array {
  writeU32(keyData, valAt, KEY_DATA_SIZE);
  writeU32(keyData, valSize, KEY_DATA_SIZE + U32_SIZE);

  return keyData;
}

export function newHdr (indexes: { dataAt: number; hdrIndex: number; isKey: boolean }[]): Uint8Array {
  const hdr = new Uint8Array(HDR_TOTAL_SIZE);

  indexes.forEach(({ dataAt, hdrIndex, isKey }): void => {
    modifyHdr(hdr, hdrIndex, dataAt, isKey);
  });

  return hdr;
}

export function newKey (key: KeyParts, { valAt, valSize }: ValInfo): Uint8Array {
  const keyData = new Uint8Array(KEY_TOTAL_SIZE);

  keyData.set(key.buffer, 0);

  return modifyKey(keyData, valAt, valSize);
}

export function parseHdr (hdr: Uint8Array, hdrIndex: number): ParsedHdr {
  const u32 = readU32(hdr, hdrIndex * HDR_ENTRY_SIZE);
  const linkTo = u32 & BITS_U;

  return {
    isKey: linkTo !== u32,
    linkTo
  };
}

export function parseKey (keyData: Uint8Array): ParsedKey {
  return {
    valAt: readU32(keyData, KEY_DATA_SIZE),
    valSize: readU32(keyData, KEY_DATA_SIZE + U32_SIZE)
  };
}

export function serializeKey (buffer: Uint8Array): KeyParts {
  const nibbles = new Uint8Array(KEY_PARTS_SIZE);
  let offset = 0;

  for (let i = 0; i < KEY_DATA_SIZE; i++) {
    const item = buffer[i];

    nibbles[offset] = item & 0b1111;
    nibbles[offset + 1] = item >> 4;
    offset += 2;
  }

  return { buffer, fileAt: (buffer[0] % DB_MAX_FILES), nibbles };
}
