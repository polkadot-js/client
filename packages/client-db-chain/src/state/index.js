// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State } from './types';

const wrapDb = require('@polkadot/client-db/wrap');
const trieRoot = require('@polkadot/util-triehash/root');

const debug = require('../debug');
const consensus = require('./consensus');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = function state (baseDb: BaseDbInterface): ChainDb$State {
  const db = wrapDb(baseDb);

  return {
    clear: (): void =>
      db.clear(),
    commit: (): void =>
      db.commit(),
    debug: (): { [string]: string } =>
      debug(db),
    consensus: consensus(db),
    governance: governance(db),
    session: session(db),
    staking: staking(db),
    system: system(db),
    trieRoot: (): Uint8Array =>
      trieRoot(db.pairs())
  };
};
