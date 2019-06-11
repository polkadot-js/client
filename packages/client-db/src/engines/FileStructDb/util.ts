// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { NibbleBuffer, ParsedHdr, ParsedKey, Slot, ValInfo } from './types';

import lz4 from 'lz4';
import { bufferToU8a, u8aToBuffer } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';

import defaults from './defaults';

export function modifyHdr (hdr: Buffer, hdrIndex: number, type: Slot, at: number): Buffer {
  const entryIndex = hdrIndex * defaults.HDR_ENTRY_SIZE;

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

  for (let i = 0; offset < hdrLength; i++, offset += defaults.HDR_ENTRY_SIZE) {
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
  // Convert any non-32-byte keys into a hash of the key. This allows for proper
  // key distribution. In practice, the inputs should already be hashed, in the
  // case of using a trie, however if used directly, this would come into play
  const buffer = u8aToBuffer(
    u8a.length === defaults.KEY_SIZE
      ? u8a
      : blake2AsU8a(u8a)
  );

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
