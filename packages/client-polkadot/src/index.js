// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface } from './types';

const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = function polkadot (db: BaseDbInterface): PolkadotInterface {
  return {
    governance: governance(db),
    session: session(db),
    staking: staking(db),
    system: system(db)
  };
};
