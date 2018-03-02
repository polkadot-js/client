// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotStateDb } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');

const consensys = require('./consensys');
const debug = require('./debug');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = function stateDb (baseDb: BaseDbInterface): PolkadotStateDb {
  return {
    clear: (): void =>
      baseDb.clear(),
    commit: (): void =>
      baseDb.commit(),
    debug: (): { [string]: string } =>
      debug(baseDb),
    consensys: consensys(baseDb),
    governance: governance(baseDb),
    session: session(baseDb),
    staking: staking(baseDb),
    system: system(baseDb),
    trieRoot: (): Uint8Array =>
      trieRoot(baseDb.pairs())
  };
};
