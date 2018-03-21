// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotStateDb } from '../types';

const wrapDb = require('@polkadot/client-db/wrap');
const trieRoot = require('@polkadot/util-triehash/root');

const consensys = require('./consensys');
const debug = require('./debug');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = function stateDb (baseDb: BaseDbInterface): PolkadotStateDb {
  const db = wrapDb(baseDb);

  return {
    clear: (): void =>
      db.clear(),
    commit: (): void =>
      db.commit(),
    debug: (): { [string]: string } =>
      debug(db),
    consensys: consensys(db),
    governance: governance(db),
    session: session(db),
    staking: staking(db),
    system: system(db),
    trieRoot: (): Uint8Array =>
      trieRoot(db.pairs())
  };
};
