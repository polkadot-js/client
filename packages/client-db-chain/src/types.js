// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';

export type BaseDb = {
  clear: () => void,
  commit: (values?: Trie$Pairs) => void,
  del: (key: Uint8Array) => void,
  isEmpty: () => boolean,
  get: (key: Uint8Array) => Uint8Array,
  pairs: () => Trie$Pairs,
  set: (key: Uint8Array, value: Uint8Array) => void
}

export type WrapDb = BaseDb & {
  debug: () => { [string]: string },
  trieRoot: () => Uint8Array
};

export type Storage$Key$Value = number | BN | Uint8Array | string;

export type Storage$Key$Values = Array<Storage$Key$Value>;

export type StorageMethod<P, R> = {
  get: (...params?: Storage$Key$Values) => R,
  set: (value: P, ...params?: Storage$Key$Values) => void
}

export type StorageMethod$Account = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$Bn = StorageMethod<BN | number, BN>;

export type StorageMethod$U8a = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$ArrayAccount = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethod$ArrayU8a = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethods = StorageMethod$Account | StorageMethod$Bn | StorageMethod$U8a | StorageMethod$ArrayU8a | StorageMethod$ArrayAccount;

export type WrappedDb<O> = O & {
  db: WrapDb
}
