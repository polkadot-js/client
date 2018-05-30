// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
/* eslint-disable */

import type { Storage$Sections } from '@polkadot/storage/types';
import type { Param$Types, Section } from '@polkadot/params/types';
import type { WrapDb, StorageMethod$Account, StorageMethod$Bn, StorageMethod$U8a, WrappedDb } from '../types';

import storage from '@polkadot/storage';

import expandKey from '../create/key';

export type StateDb$Consensus = {
  authority: StorageMethod$Account,
  authorityCount: StorageMethod$Bn,
  code: StorageMethod$U8a
};

export type StateDb$Council = {};

export type StateDb$CouncilVoting = {};

export type StateDb$Democracy = {};

export type StateDb$Governance = {
  approvalsRatio: StorageMethod$Bn
};

export type StateDb$Session = {
  length: StorageMethod$Bn,
  validator: StorageMethod$Account
};

export type StateDb$Staking = {
  currentEra: StorageMethod$Bn,
  freeBalanceOf: StorageMethod$Bn,
  sessionsPerEra: StorageMethod$Bn,
  validatorCount: StorageMethod$Bn
};

export type StateDb$System = {
  accountIndexOf: StorageMethod$Bn,
  blockHashAt: StorageMethod$U8a
};

export type StateDb$Timestamp = {};

export type StateDb = WrappedDb<{
  consensus: StateDb$Consensus,
  council: StateDb$Council,
  councilVoting: StateDb$CouncilVoting,
  democracy: StateDb$Democracy,
  governance: StateDb$Governance,
  session: StateDb$Session,
  staking: StateDb$Staking,
  system: StateDb$System,
  timestamp: StateDb$Timestamp
}>;
