// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
// import type { Section, Sections, Section$Item } from '@polkadot/params/types';
// import type { Storage$Sections } from '@polkadot/storage/types';
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
  getn: (key: Uint8Array, bitLength?: number) => BN,
  setn: (key: Uint8Array, value: BN | number, bitLength?: number) => void,
  trieRoot: () => Uint8Array
};

export type Storage$Key$Value = number | BN | Uint8Array | string;

export type Storage$Key$Values = Array<Storage$Key$Value>;

export type StorageMethod<T> = {
  get: (...params?: Storage$Key$Values) => T,
  set: (value: T, ...params?: Storage$Key$Values) => void
}

export type StorageMethods = StorageMethod<BN> | StorageMethod<Uint8Array>;

export type StateDb$Section = {
  [string]: StorageMethods
}

export type WrappedDb<O> = O & {
  db: WrapDb
}

export type StateDb = WrappedDb<{
  consensus: StateDb$Section,
  council: StateDb$Section,
  councilVoting: StateDb$Section,
  democracy: StateDb$Section,
  governance: StateDb$Section,
  session: StateDb$Section,
  staking: StateDb$Section,
  system: StateDb$Section,
  timestamp: StateDb$Section
}>;

export type ChainDb$Block = WrappedDb<{
  bestHash: StorageMethod<Uint8Array>,
  bestNumber: StorageMethod<BN>,
  block: StorageMethod<Uint8Array>
}>;
