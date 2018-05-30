// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '../types';
import type { StateDb } from './types';

const { consensus, governance, session, staking, system } = require('@polkadot/storage');

const createAcc = require('../create/account');
const createBn = require('../create/bn');
const createU8a = require('../create/u8a');
const createDb = require('../db');

module.exports = function createState (baseDb: BaseDb): StateDb {
  const db = createDb(baseDb);

  return {
    db,
    consensus: {
      authority: createAcc(consensus.public.authority, db),
      authorityCount: createBn(consensus.public.authorityCount, db, 32),
      code: createU8a(consensus.public.code, db)
    },
    council: {},
    councilVoting: {},
    democracy: {},
    governance: {
      approvalsRatio: createBn(governance.public.approvalsRatio, db, 64)
    },
    session: {
      length: createBn(consensus.public.length, db, 64),
      validator: createAcc(session.public.validator, db)
    },
    staking: {
      currentEra: createBn(staking.public.currentEra, db, 64),
      freeBalanceOf: createBn(staking.public.freeBalanceOf, db, 128),
      sessionsPerEra: createBn(staking.public.sessionsPerEra, db, 64),
      validatorCount: createBn(staking.public.validatorCount, db, 32)
    },
    system: {
      accountIndexOf: createBn(system.public.accountIndexOf, db, 32),
      blockHashAt: createU8a(system.public.blockHashAt, db)
    },
    timestamp: {}
  };
};
