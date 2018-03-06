// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType, ChainInterface$Blocks } from '@polkadot/client-chains/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { Logger } from '@polkadot/util/types';

export type PolkadotBlockDb = ChainInterface$Blocks;

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
  clear: () => void,
  commit: () => void,
  consensys: PolkadotStateDb$Consensys,
  governance: PolkadotStateDb$Governance,
  session: PolkadotStateDb$Session,
  staking: PolkadotStateDb$Staking,
  system: PolkadotStateDb$System,
  trieRoot: () => Uint8Array
}

export type PolkadotState = {
  blockDb: PolkadotBlockDb,
  config: ConfigType,
  chain: ChainConfigType,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: PolkadotStateDb
};
