// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainInterface$Blocks } from '@polkadot/client-chains/types';

export type ChainDb$Block = ChainInterface$Blocks;

export type ChainDb$State$Consensys = {
  setAuthority (id: BN | number, publicKey: Uint8Array): void,
  setAuthorityCount (count: BN | number): void
}

export type ChainDb$State$Governance = {
  setApprovalsRatio (ratio: BN | number): void
}

export type ChainDb$State$Session = {
  setLength (length: BN | number): void,
  setValue (id: BN | number, publicKey: Uint8Array): void,
  setValueCount (count: BN | number): void
}

export type ChainDb$State$Staking = {
  getBalance (publicKey: Uint8Array): BN,
  setBalance (publicKey: Uint8Array, value: BN | number): void,
  setCurrentEra (era: BN | number): void,
  setIntent (id: BN | number, publicKey: Uint8Array): void,
  setIntentLength (length: BN | number): void,
  setSessionsPerEra (count: BN | number): void,
  setValidatorCount (count: BN | number): void
}

export type ChainDb$State$System = {
  getBlockHash (block: BN | number): Uint8Array,
  getCode (): Uint8Array,
  getNonce (publicKey: Uint8Array): BN,
  setBlockHash (block: BN | number, hash: Uint8Array): void,
  setCode (code: Uint8Array): void
}

export type ChainDb$State = {
  clear: () => void,
  commit: () => void,
  consensys: ChainDb$State$Consensys,
  governance: ChainDb$State$Governance,
  session: ChainDb$State$Session,
  staking: ChainDb$State$Staking,
  system: ChainDb$State$System,
  trieRoot: () => Uint8Array
}
