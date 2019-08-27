// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { TxDb } from '@polkadot/db/types';
import { TrieDb, TrieEntry } from '@polkadot/trie-db/types';

export type DbPathPrefix = 'database';

export type DbConfig$Type = 'file' | 'lmdb' | 'memory';

export interface DiskDbOptions {
  isCompressed: boolean;
  isLru: boolean;
  isTrie: boolean;
}

export interface DbConfig {
  compact: boolean;
  path: string;
  type: DbConfig$Type;
}

export interface StorageMethod<P, R> {
  del: (...params: any[]) => void;
  get: (...params: any[]) => R;
  set: (value: P, ...params: any[]) => void;
  onUpdate: (callback: (value: P) => void) => void;
}

export type StorageMethod$Account = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$Bn = StorageMethod<BN | number, BN>;

export type StorageMethod$Bool = StorageMethod<boolean, boolean>;

export type StorageMethod$U8a = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$ArrayAccount = StorageMethod<Uint8Array[], Uint8Array[]>;

export type StorageMethod$ArrayU8a = StorageMethod<Uint8Array[], Uint8Array[]>;

export type StorageMethods = StorageMethod$Account | StorageMethod$Bn | StorageMethod$Bool | StorageMethod$U8a | StorageMethod$ArrayU8a | StorageMethod$ArrayAccount;

export interface BlockDb {
  db: TxDb;
  bestHash: StorageMethod$U8a;
  bestNumber: StorageMethod$Bn;
  blockData: StorageMethod$U8a;
  hash: StorageMethod$U8a;
  header: StorageMethod$U8a;
}

export interface StateDb {
  db: TrieDb;

  getRootEntry (): TrieEntry | null;
  getRoot (): Uint8Array;
  setRoot (root: Uint8Array): void;
  snapshot (blockNumber: BN): void;
}

export interface ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;
}
