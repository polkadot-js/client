// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { NibbleBuffer, ParsedHdr, ParsedKey, Slot, ValInfo } from './types';

import lz4 from 'lz4';
import { toNibbles } from '@polkadot/trie-codec/util';
import { assert, bufferToU8a, u8aToBuffer, u8aToHex } from '@polkadot/util';

import defaults from './defaults';

export function modifyHdr (hdr: Buffer, hdrIndex: number, type: Slot, at: number): Buffer {
  const entryIndex = hdrIndex * defaults.ENTRY_SIZE;

  hdr.set([type], entryIndex);
  hdr.writeUIntBE(at, entryIndex + 1, defaults.UINT_SIZE);

  return hdr;
}

export function modifyKey (keyData: Buffer, valAt: number, valSize: number): Buffer {
  keyData.writeUIntBE(valAt, defaults.KEY_SIZE, defaults.UINT_SIZE);
  keyData.writeUIntBE(valSize, defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE);

  return keyData;
}

export function newHdr (indexes: Array<{ dataAt: number, hdrIndex: number, type: Slot }>): Buffer {
  const hdr = Buffer.alloc(defaults.HDR_SIZE);

  indexes.forEach(({ dataAt, hdrIndex, type }) =>
    modifyHdr(hdr, hdrIndex, type, dataAt)
  );

  return hdr;
}

export function newKey (key: NibbleBuffer, { valAt, valSize }: ValInfo): Buffer {
  const keyData = Buffer.alloc(defaults.KEY_TOTAL_SIZE);

  keyData.set(key.buffer, 0);

  return modifyKey(keyData, valAt, valSize);
}

export function parseHdr (hdr: Buffer): ParsedHdr {
  const parsed: ParsedHdr = [];
  const hdrLength = hdr.length;
  let offset = 0;

  for (let i = 0; offset < hdrLength; i++, offset += defaults.ENTRY_SIZE) {
    parsed.push({
      at: hdr.readUIntBE(offset + 1, defaults.UINT_SIZE),
      type: hdr[offset]
    });
  }

  return parsed;
}

export function parseKey (keyData: Buffer): ParsedKey {
  return {
    valAt: keyData.readUIntBE(defaults.KEY_SIZE, defaults.UINT_SIZE),
    valSize: keyData.readUIntBE(defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE)
  };
}

export function deserializeValue (buffer: Buffer | null, isCompressed: boolean): Uint8Array | null {
  return buffer
    ? bufferToU8a(
      isCompressed
        ? lz4.decode(buffer)
        : buffer
    )
    : null;
}

export function serializeValue (u8a: Uint8Array, isCompressed: boolean): Buffer {
  const buffer = u8aToBuffer(u8a);

  return isCompressed
    ? lz4.encode(buffer, { highCompression: true })
    : buffer;
}

export function serializeKey (u8a: Uint8Array): NibbleBuffer {
  assert(u8a.length <= defaults.KEY_SIZE, () => `${u8aToHex(u8a)} too large, expected <= 32 bytes, found ${u8a.length} bytes`);

  let full;

  // for trie, we expect 32-bytes, however for straight xxhash-64 values, such
  // as the keys from block, we extend the key to be the full 32 bytes
  if (u8a.length === defaults.KEY_SIZE) {
    full = u8a;
  } else {
    full = new Uint8Array(defaults.KEY_SIZE);

    full.set(u8a, 0);
  }

  // the full nibbles - here we will use the first (index 0) as a pointer to the file,
  // indicated by "index" and combine the second and third (1 & 2) for a 256-length first
  // header. Both these make initial reads slightly more bearable.
  const nibbles = toNibbles(full);
  const parts = nibbles.subarray(2);

  parts.set([(nibbles[1] << 4) + nibbles[2]], 0);

  return {
    buffer: u8aToBuffer(full),
    index: nibbles[0],
    parts
  };
}
