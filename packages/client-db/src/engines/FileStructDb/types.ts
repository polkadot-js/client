// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export enum Slot {
  EMPTY = 0,
  HDR = 1,
  KEY = 2
}

export enum TrieDecoded {
  UNTOUCHED = 0
}

export type KeyParts = {
  buffer: Uint8Array,
  index: number,
  parts: Array<number>
};

export type KeyInfo = {
  keyAt: number,
  keyData: Uint8Array
};

export type ValInfo = {
  valAt: number,
  valData: Uint8Array | null,
  valSize: number
};

export type KVInfo = KeyInfo & ValInfo;

export type ParsedHdr = { at: number, type: Slot };

export type ParsedKey = { valAt: number, valSize: number };
