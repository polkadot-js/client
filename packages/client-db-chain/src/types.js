// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';

export type BaseDb = {
  clear: () => void,
  commit: (values?: Trie$Pairs) => void,
  del: (key: Uint8Array) => void,
  isEmpty: () => boolean,
  get: (key: Uint8Array) => Uint8Array | null,
  pairs: () => Trie$Pairs,
  set: (key: Uint8Array, value: Uint8Array) => void
}

export type WrapDb = BaseDb & {
  debug: () => { [string]: string },
  trieRoot: () => Uint8Array
};

export type StorageMethod<P, R> = {
  del: (...params?: Storage$Key$Values) => void,
  get: (...params?: Storage$Key$Values) => R,
  set: (value: P, ...params?: Storage$Key$Values) => void
}

export type StorageMethod$Account = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$Bn = StorageMethod<BN | number, BN>;

export type StorageMethod$Bool = StorageMethod<boolean, boolean>;

export type StorageMethod$U8a = StorageMethod<Uint8Array, Uint8Array>;

export type StorageMethod$ArrayAccount = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethod$ArrayU8a = StorageMethod<Array<Uint8Array>, Array<Uint8Array>>;

export type StorageMethods = StorageMethod$Account | StorageMethod$Bn | StorageMethod$Bool | StorageMethod$U8a | StorageMethod$ArrayU8a | StorageMethod$ArrayAccount;

export type WrappedDb<O> = O & {
  db: WrapDb
}

export type BlockDb = WrappedDb<{
  bestHash: StorageMethod$U8a,
  bestNumber: StorageMethod$Bn,
  block: StorageMethod$U8a
}>;

export type StateDb$Consensus = {
  authorityAt: StorageMethod$Account,
  authorityCount: StorageMethod$Bn,
  code: StorageMethod$U8a
};

export type StateDb$Council = {
  activeCouncil: StorageMethod$ArrayU8a,
  candidacyBond: StorageMethod$Bn,
  carryCount: StorageMethod$Bn,
  desiredSeats: StorageMethod$Bn,
  inactiveGracePeriod: StorageMethod$Bn,
  presentationDuration: StorageMethod$Bn,
  presentSlashPerVoter: StorageMethod$Bn,
  termDuration: StorageMethod$Bn,
  votingBond: StorageMethod$Bn,
  votingPeriod: StorageMethod$Bn
};

export type StateDb$CouncilVoting = {
  cooloffPeriod: StorageMethod$Bn,
  votingPeriod: StorageMethod$Bn
};

export type StateDb$Democracy = {
  launchPeriod: StorageMethod$Bn,
  minimumDeposit: StorageMethod$Bn,
  votingPeriod: StorageMethod$Bn
};

export type StateDb$Governance = {
  approvalsRatio: StorageMethod$Bn
};

export type StateDb$Parachains = {
  didUpdate: StorageMethod$Bool
};

export type StateDb$Session = {
  length: StorageMethod$Bn,
  validators: StorageMethod$ArrayAccount
};

export type StateDb$Staking = {
  bondingDuration: StorageMethod$Bn,
  currentEra: StorageMethod$Bn,
  freeBalanceOf: StorageMethod$Bn,
  intentions: StorageMethod$ArrayAccount,
  sessionsPerEra: StorageMethod$Bn,
  transactionFee: StorageMethod$Bn,
  validatorCount: StorageMethod$Bn
};

export type StateDb$System = {
  accountIndexOf: StorageMethod$Bn,
  blockHashAt: StorageMethod$U8a
};

export type StateDb$Timestamp = {
  didUpdate: StorageMethod$Bool
};

export type StateDb = WrappedDb<{
  consensus: StateDb$Consensus,
  council: StateDb$Council,
  councilVoting: StateDb$CouncilVoting,
  democracy: StateDb$Democracy,
  governance: StateDb$Governance,
  parachains: StateDb$Parachains,
  session: StateDb$Session,
  staking: StateDb$Staking,
  system: StateDb$System,
  timestamp: StateDb$Timestamp
}>;
