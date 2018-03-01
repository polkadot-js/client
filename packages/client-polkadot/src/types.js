// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type PolkadotBlockDb = {
  getBlock: (hash: Uint8Array) => void,
  getLatestHash: () => Uint8Array,
  getLatestNumber: () => BN,
  setBlock: (hash: Uint8Array, block: Uint8Array) => void,
  setLatestHash: (hash: Uint8Array) => void,
  setLatestNumber: (number: BN | number) => void
};

export type PolkadotStateDb$Consensys = {
  setAuthority (id: BN | number, publicKey: Uint8Array, isHashed?: boolean): void,
  setAuthorityCount (count: BN | number): void
}

export type PolkadotStateDb$Governance = {
  setApprovalsRatio (ratio: BN | number): void
}

export type PolkadotStateDb$Session = {
  setLength (length: BN | number): void,
  setValue (id: BN | number, publicKey: Uint8Array): void,
  setValueCount (count: BN | number): void
}

export type PolkadotStateDb$Staking = {
  getBalance (publicKey: Uint8Array): BN,
  setBalance (publicKey: Uint8Array, value: BN | number): void,
  setCurrentEra (era: BN | number): void,
  setIntent (id: BN | number, publicKey: Uint8Array): void,
  setIntentLength (length: BN | number): void,
  setSessionsPerEra (count: BN | number): void,
  setValidatorCount (count: BN | number): void
}

export type PolkadotStateDb$System = {
  getBlockHash (block: BN | number): Uint8Array,
  getCode (): Uint8Array,
  getNonce (publicKey: Uint8Array): BN,
  setBlockHash (block: BN | number, hash: Uint8Array): void,
  setCode (code: Uint8Array): void
}

export type PolkadotStateDb = {
  commit: () => void,
  consensys: PolkadotDb$Consensys,
  governance: PolkadotDb$Governance,
  session: PolkadotDb$Session,
  staking: PolkadotDb$Staking,
  system: PolkadotDb$System,
  trieRoot: () => Uint8Array
}
