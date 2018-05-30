// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb, StateDb } from '../types';

const keys = require('@polkadot/storage');

const createKeys = require('../create/keys');
const createDb = require('../db');

module.exports = function createState (baseDb: BaseDb): StateDb {
  const db = createDb(baseDb);

  return {
    db,
    consensus: createKeys(keys.consensus.public, db),
    council: createKeys(keys.council.public, db),
    councilVoting: createKeys(keys.councilVoting.public, db),
    democracy: createKeys(keys.democracy.public, db),
    governance: createKeys(keys.governance.public, db),
    session: createKeys(keys.session.public, db),
    staking: createKeys(keys.staking.public, db),
    system: createKeys(keys.system.public, db),
    timestamp: createKeys(keys.timestamp.public, db)
  };
};
