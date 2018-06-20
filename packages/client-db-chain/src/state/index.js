// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Storage$Section } from '@polkadot/storage/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { StateDb } from '../types';

import storage from '@polkadot/storage';

import createAcc from '../db/account';
import createArrAcc from '../db/arrayAccount';
import createArrU8a from '../db/arrayU8a';
import createBn from '../db/bn';
import createBool from '../db/bool';
import createU8a from '../db/u8a';

const BALANCE_SIZE = 128;
const BLOCKNUM_SIZE = 64;

const consensus = (db: TrieDb, { public: { authorityAt, authorityCount, code } }: Storage$Section) => ({
  authorityAt: createAcc(db, authorityAt),
  authorityCount: createBn(db, authorityCount, 32),
  code: createU8a(db, code)
});

const council = (db: TrieDb, { public: { activeCouncil, candidacyBond, carryCount, desiredSeats, inactiveGracePeriod, presentationDuration, presentSlashPerVoter, termDuration, votingBond, votingPeriod } }: Storage$Section) => ({
  activeCouncil: createArrU8a(db, activeCouncil),
  candidacyBond: createBn(db, candidacyBond, BALANCE_SIZE),
  carryCount: createBn(db, carryCount, 32),
  desiredSeats: createBn(db, desiredSeats, 32),
  inactiveGracePeriod: createBn(db, inactiveGracePeriod, 32),
  presentationDuration: createBn(db, presentationDuration, BLOCKNUM_SIZE),
  presentSlashPerVoter: createBn(db, presentSlashPerVoter, BALANCE_SIZE),
  termDuration: createBn(db, termDuration, BLOCKNUM_SIZE),
  votingBond: createBn(db, votingBond, BALANCE_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const councilVoting = (db: TrieDb, { public: { cooloffPeriod, votingPeriod } }: Storage$Section) => ({
  cooloffPeriod: createBn(db, cooloffPeriod, BLOCKNUM_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const democracy = (db: TrieDb, { public: { launchPeriod, minimumDeposit, votingPeriod } }: Storage$Section) => ({
  launchPeriod: createBn(db, launchPeriod, BLOCKNUM_SIZE),
  minimumDeposit: createBn(db, minimumDeposit, BALANCE_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const governance = (db: TrieDb, { public: { approvalsRatio } }: Storage$Section) => ({
  approvalsRatio: createBn(db, approvalsRatio, BLOCKNUM_SIZE)
});

const parachains = (db: TrieDb, { public: { didUpdate } }: Storage$Section) => ({
  didUpdate: createBool(db, didUpdate)
});

const session = (db: TrieDb, { public: { length, validators } }: Storage$Section) => ({
  length: createBn(db, length, BLOCKNUM_SIZE),
  validators: createArrAcc(db, validators)
});

const staking = (db: TrieDb, { public: { bondingDuration, currentEra, freeBalanceOf, intentions, sessionsPerEra, transactionFee, validatorCount } }: Storage$Section) => ({
  bondingDuration: createBn(db, bondingDuration, BLOCKNUM_SIZE),
  currentEra: createBn(db, currentEra, BLOCKNUM_SIZE),
  freeBalanceOf: createBn(db, freeBalanceOf, BALANCE_SIZE),
  intentions: createArrAcc(db, intentions),
  sessionsPerEra: createBn(db, sessionsPerEra, BLOCKNUM_SIZE),
  transactionFee: createBn(db, transactionFee, BALANCE_SIZE),
  validatorCount: createBn(db, validatorCount, 32)
});

const system = (db: TrieDb, { public: { accountIndexOf, blockHashAt } }: Storage$Section) => ({
  accountIndexOf: createBn(db, accountIndexOf, 32),
  blockHashAt: createU8a(db, blockHashAt)
});

const timestamp = (db: TrieDb, { public: { didUpdate } }: Storage$Section) => ({
  didUpdate: createBool(db, didUpdate)
});

export default function createState (db: TrieDb): StateDb {
  return {
    db,
    consensus: consensus(db, storage.consensus),
    council: council(db, storage.council),
    councilVoting: councilVoting(db, storage.councilVoting),
    democracy: democracy(db, storage.democracy),
    governance: governance(db, storage.governance),
    parachains: parachains(db, storage.parachains),
    session: session(db, storage.session),
    staking: staking(db, storage.staking),
    system: system(db, storage.system),
    timestamp: timestamp(db, storage.timestamp)
  };
}
