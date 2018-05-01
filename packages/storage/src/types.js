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
  getn: (key: Uint8Array, bitLength?: number) => BN,
  setn: (key: Uint8Array, value: BN | number, bitLength?: number) => void,
  trieRoot: () => Uint8Array
};

export type StateDb$SectionNames = 'consensus' | 'council' | 'councilVoting' | 'democracy' | 'governance' | 'session' | 'staking' | 'system' | 'timestamp';

export type StorageDef$Key$Type = 'AccountId' | 'Balance' | 'BlockNumber' | 'bool' | 'Bytes' | 'Digest' | 'Hash' | 'Proposal' | 'u32' | 'u64';

export type StorageDef$Key$Params = {
  [string]: StorageDef$Key$Type
};

export type StorageDef$Key = {
  isUnhashed?: boolean,
  description: string,
  key: Uint8Array | string,
  params?: StorageDef$Key$Params,
  type: StorageDef$Key$Type
};

export type StorageDef$Section = {
  [string]: StorageDef$Key
}

export type StorageDef = {
  [StateDb$SectionNames]: StorageDef$Section
}

export type StorageDef$Key$Value = number | BN | Uint8Array | string;

export type StorageDef$Key$Values = Array<StorageDef$Key$Value>;

export type StorageMethod = {
  get: (...params?: StorageDef$Key$Values) => Uint8Array,
  getn: (...params?: StorageDef$Key$Values) => BN,
  set: (value: Uint8Array, ...params?: StorageDef$Key$Values) => void,
  setn: (value: BN | number, ...params?: StorageDef$Key$Values) => void
}

export type StateDb$Section = {
  [string]: StorageMethod
}

export type StateDb = {
  db: WrapDb,
  [StateDb$SectionNames]: StateDb$Section
}
