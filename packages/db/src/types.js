// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';

export type DbKeygen = (...params?: Array<Uint8Array>) => Uint8Array;

export type State$SectionNames = 'consensus' | 'governance' | 'session' | 'staking' | 'system';

export type State$Key$Type = 'AccountId' | 'Bytes' | 'Hash' | 'u32' | 'u64';

export type State$Definition$Key = {
  isUnhashed?: boolean,
  key: Uint8Array | string,
  params?: Array<State$Key$Type>,
  type?: State$Key$Type
};

export type State$Definition$Section = {
  [string]: State$Definition$Key
}

export type State$Definition = {
  [State$SectionNames]: State$Definition$Section
}

export type State$Key$ParamType = number | BN | Uint8Array | string;

export type State$Method = {
  get: (...params?: Array<State$Key$ParamType>) => Uint8Array,
  getn: (...params?: Array<State$Key$ParamType>) => BN,
  set: (value: Uint8Array, ...params?: Array<State$Key$ParamType>) => void,
  setn: (value: BN | number, ...params?: Array<State$Key$ParamType>) => void
}

export type State$Section = {
  [string]: State$Method
}

export type State = {
  [State$SectionNames]: State$Section
}

export type BaseDbInterface = {
  clear: () => void,
  commit: (values?: Trie$Pairs) => void,
  del: (key: Uint8Array) => void,
  isEmpty: () => boolean,
  get: (key: Uint8Array) => Uint8Array,
  pairs: () => Trie$Pairs,
  set: (key: Uint8Array, value: Uint8Array) => void
}

export type WrapDbInterface = BaseDbInterface & {
  debug: () => { [string]: string },
  getBn: (key: Uint8Array, bitLength?: number) => BN,
  setBn: (key: Uint8Array, value: BN | number, bitLength?: number) => void,
  trieRoot: () => Uint8Array
};

export type Db = WrapDbInterface & State;
