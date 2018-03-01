// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotStateDb } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');

const consensys = require('./consensys');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = function db (stateDb: BaseDbInterface): PolkadotStateDb {
  return {
    clear: (): void =>
      stateDb.clear(),
    commit: (): void =>
      stateDb.commit(),
    consensys: consensys(stateDb),
    governance: governance(stateDb),
    session: session(stateDb),
    staking: staking(stateDb),
    system: system(stateDb),
    trieRoot: (): Uint8Array =>
      trieRoot(stateDb.pairs()),
    debug: (): { [string]: string } =>
      stateDb.pairs().reduce((result, { k, v }) => {
        result[k.toString()] = `[${v.toString()}]`;

        return result;
      }, {})
  };
};
