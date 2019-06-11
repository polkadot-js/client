// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyParts, ParsedHdr, ParsedKey, Slot, ValInfo } from './types';

import lz4 from 'lz4';
import { bufferToU8a } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';

import defaults from './defaults';

export function readU8aU32 (u8a: Uint8Array, offset: number): number {
  return u8a[offset] + (u8a[offset + 1] << 8) + (u8a[offset + 2] << 16) + (u8a[offset + 3] << 24);
}

export function writeU8aU32 (u8a: Uint8Array, value: number, offset: number): void {
  u8a.set([value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff], offset);
}

export function modifyHdr (hdr: Uint8Array, hdrIndex: number, type: Slot, at: number): Uint8Array {
  const entryIndex = hdrIndex * defaults.HDR_ENTRY_SIZE;

  hdr.set([type], entryIndex);
  writeU8aU32(hdr, at, entryIndex + 1);

  return hdr;
}

export function modifyKey (keyData: Uint8Array, valAt: number, valSize: number): Uint8Array {
  writeU8aU32(keyData, valAt, defaults.KEY_SIZE);
  writeU8aU32(keyData, valSize, defaults.KEY_SIZE + defaults.UINT_SIZE);

  return keyData;
}

export function newHdr (indexes: Array<{ dataAt: number, hdrIndex: number, type: Slot }>): Uint8Array {
  const hdr = new Uint8Array(defaults.HDR_SIZE);

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

export function parseHdr (hdr: Uint8Array): ParsedHdr {
  const parsed: ParsedHdr = [];
  const hdrLength = hdr.length;
  let offset = 0;

  for (let i = 0; offset < hdrLength; i++, offset += defaults.HDR_ENTRY_SIZE) {
    parsed.push({
      at: readU8aU32(hdr, offset + 1),
      type: hdr[offset]
    });
  }

  return parsed;
}

export function parseKey (keyData: Uint8Array): ParsedKey {
  return {
    valAt: readU8aU32(keyData, defaults.KEY_SIZE),
    valSize: readU8aU32(keyData, defaults.KEY_SIZE + defaults.UINT_SIZE)
  };
}

export function deserializeValue (buffer: Uint8Array | null, isCompressed: boolean): Uint8Array | null {
  return buffer
    ? isCompressed
      ? bufferToU8a(lz4.decode(buffer))
      : buffer
    : null;
}

export function serializeValue (u8a: Uint8Array, isCompressed: boolean): Uint8Array {
  return isCompressed
    ? lz4.encode(u8a, { highCompression: true })
    : u8a;
}

export function serializeKey (u8a: Uint8Array): KeyParts {
  // Convert any non-32-byte keys into a hash of the key. This allows for proper
  // key distribution. In practice, the inputs should already be hashed, in the
  // case of using a trie, however if used directly, this would come into play
  const buffer = u8a.length === defaults.KEY_SIZE
    ? u8a
    : blake2AsU8a(u8a);

  const parts: Array<number> = [];
  let index = 0;

  for (let i = 0; i < buffer.length; i++) {
    const item = buffer[i];

    if (i === 0) {
      index = item & 0b1111;
      parts.push((item >> 4) & 0b11, (item >> 6) & 0b11);
    } else {
      parts.push(item & 0b11, (item >> 2) & 0b11, (item >> 4) & 0b11, (item >> 6) & 0b11);
    }
  }

  return { buffer, index, parts };
}
