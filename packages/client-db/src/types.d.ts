// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { BaseDb, TxDb } from '@polkadot/db/types';
import { TrieDb } from '@polkadot/trie-db/types';

export type DbPathPrefix = 'database';

export type DbConfig$Type = 'disk' | 'memory';

export type DbConfig = {
  compact: boolean,
  isTrieDb: boolean,
  path: string,
  snapshot: boolean,
  type: DbConfig$Type
};

export type StorageMethod<P, R> = {
  del: (...params: Array<any>) => void,
  get: (...params: Array<any>) => R,
  set: (value: P, ...params: Array<any>) => void,
  onUpdate: (callback: (value: P) => void) => void
}

export type StorageMethod$Account = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$Bn = StorageMethod<BN | number, BN>;

export type StorageMethod$Bool = StorageMethod<boolean, boolean>;

export type StorageMethod$U8a = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$ArrayAccount = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethod$ArrayU8a = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethods = StorageMethod$Account | StorageMethod$Bn | StorageMethod$Bool | StorageMethod$U8a | StorageMethod$ArrayU8a | StorageMethod$ArrayAccount;

export type BlockDb = {
  db: BaseDb,
  bestHash: StorageMethod$U8a,
  bestNumber: StorageMethod$Bn,
  block: StorageMethod$U8a,
  header: StorageMethod$U8a
};

export type StateDb = {
  db: TrieDb,
  blockHashAt: StorageMethod$U8a,
  code: StorageMethod$U8a
};

export interface ChainDbs {
  readonly blocks: BlockDb,
  readonly state: StateDb,

  snapshot (): void;
}
