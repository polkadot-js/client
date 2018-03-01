// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { PolkadotBlock } from '@polkadot/primitives/block';

export type PolkadotDb$Consensys = {
  setAuthority (id: BN | number, publicKey: Uint8Array, isHashed?: boolean): void,
  setAuthorityCount (count: BN | number): void
}

export type PolkadotDb$Governance = {
  setApprovalsRatio (ratio: BN | number): void
}

export type PolkadotDb$Session = {
  setLength (length: BN | number): void,
  setValue (id: BN | number, publicKey: Uint8Array): void,
  setValueCount (count: BN | number): void
}

export type PolkadotDb$Staking = {
  getBalance (publicKey: Uint8Array): BN,
  setBalance (publicKey: Uint8Array, value: BN | number): void,
  setCurrentEra (era: BN | number): void,
  setIntent (id: BN | number, publicKey: Uint8Array): void,
  setIntentLength (length: BN | number): void,
  setSessionsPerEra (count: BN | number): void,
  setValidatorCount (count: BN | number): void
}

export type PolkadotDb$System = {
  getBlockHash (block: BN | number): Uint8Array,
  getCode (): Uint8Array,
  getNonce (publicKey: Uint8Array): BN,
  setBlockHash (block: BN | number, hash: Uint8Array): void,
  setCode (code: Uint8Array): void
}

export type PolkadotDb = {
  consensys: PolkadotDb$Consensys,
  governance: PolkadotDb$Governance,
  session: PolkadotDb$Session,
  staking: PolkadotDb$Staking,
  system: PolkadotDb$System,
  trieRoot: () => Uint8Array
}

export type ChainExecutor = {
  executeBlock (block: Uint8Array): boolean,
  executeTransaction (header: Uint8Array, utx: Uint8Array): Uint8Array,
  finaliseBlock (header: Uint8Array): Uint8Array,
  generateBlock (number: number, transactions: Array<Uint8Array>): Uint8Array,
  importBlock (block: Uint8Array): boolean
};

export type PolkadotInterface = {
  executor: ChainExecutor,
  genesis: PolkadotBlock
}
