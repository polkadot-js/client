// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export enum Slot {
  EMPTY = 0,
  HDR = 1,
  KEY = 2
}

export enum TrieDecoded {
  UNTOUCHED = 0,
  LINKED = 1
}

export type NibbleBuffer = {
  buffer: Buffer,
  index: number,
  parts: Array<number>
};

export type KeyInfo = {
  keyAt: number,
  keyData: Buffer
};

export type ValInfo = {
  valAt: number,
  valData: Buffer | null,
  valSize: number
};

export type KVInfo = KeyInfo & ValInfo;

export type ParsedHdr = Array<{ at: number, type: Slot }>;

export type ParsedKey = { valAt: number, valSize: number };
