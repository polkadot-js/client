// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyParts, ParsedHdr, ParsedKey, Slot, ValInfo } from './types';

import { blake2AsU8a } from '@polkadot/util-crypto';

import defaults from './defaults';

export function u32ToArray (value: number): Array<number> | Uint8Array {
  return [value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff];
}

export function readU8aU32 (u8a: Uint8Array, offset: number): number {
  return u8a[offset] + (u8a[offset + 1] << 8) + (u8a[offset + 2] << 16) + (u8a[offset + 3] << 24);
}

export function writeU8aU32 (u8a: Uint8Array, value: number, offset: number): void {
  u8a.set(u32ToArray(value), offset);
}

export function modifyHdr (hdr: Uint8Array, hdrIndex: number, type: Slot, at: number): Uint8Array {
  writeU8aU32(hdr, (at << 2) | type, hdrIndex * defaults.HDR_ENTRY_SIZE);

  return hdr;
}

export function modifyKey (keyData: Uint8Array, valAt: number, valSize: number): Uint8Array {
  writeU8aU32(keyData, valAt, defaults.KEY_DATA_SIZE);
  writeU8aU32(keyData, valSize, defaults.KEY_DATA_SIZE + defaults.U32_SIZE);

  return keyData;
}

export function newHdr (indexes: Array<{ dataAt: number, hdrIndex: number, type: Slot }>): Uint8Array {
  const hdr = new Uint8Array(defaults.HDR_TOTAL_SIZE);

  indexes.forEach(({ dataAt, hdrIndex, type }) =>
    modifyHdr(hdr, hdrIndex, type, dataAt)
  );

  return hdr;
}

export function newKey (key: KeyParts, { valAt, valSize }: ValInfo): Uint8Array {
  const keyData = new Uint8Array(defaults.KEY_TOTAL_SIZE);

  keyData.set(key.buffer, 0);

  return modifyKey(keyData, valAt, valSize);
}

export function parseHdr (hdr: Uint8Array, hdrIndex: number): ParsedHdr {
  const value = readU8aU32(hdr, hdrIndex * defaults.HDR_ENTRY_SIZE);

  return {
    at: value >> 2,
    type: value & 0b11
  };
}

export function parseKey (keyData: Uint8Array): ParsedKey {
  return {
    valAt: readU8aU32(keyData, defaults.KEY_DATA_SIZE),
    valSize: readU8aU32(keyData, defaults.KEY_DATA_SIZE + defaults.U32_SIZE)
  };
}

export function serializeKey (u8a: Uint8Array): KeyParts {
  // Convert any non-32-byte keys into a hash of the key. This allows for proper
  // key distribution. In practice, the inputs should already be hashed, in the
  // case of using a trie, however if used directly, this would come into play
  const buffer = u8a.length === defaults.KEY_DATA_SIZE
    ? u8a
    : blake2AsU8a(u8a);

  const parts = new Uint8Array(defaults.KEY_PARTS_SIZE);
  let count = 1;

  // for 16 files, with 16 entries per header
  // const index = buffer[0] & 0b1111;
  // parts[count++] = buffer[0] >> 4;

  // for 64 files, with 4 entries per header
  const index = buffer[0] & 0b111111;
  parts[0] = buffer[0] >> 6;

  for (let i = 1; i < defaults.KEY_DATA_SIZE; i++) {
    const item = buffer[i];

    // for 16 files, with 16 entries per header
    // parts[count] = item & 0b1111;
    // parts[count + 1] = item >> 4;
    // count += 2

    // for 64 files, with 4 entries per header
    parts[count] = item & 0b11;
    parts[count + 1] = (item >> 2) & 0b11;
    parts[count + 2] = (item >> 4) & 0b11;
    parts[count + 3] = (item >> 6) & 0b11;
    count += 4;
  }

  return { buffer, index, parts };
}
