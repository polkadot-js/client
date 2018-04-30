// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface, Db, State$Key$ParamType } from '@polkadot/db/types';

const createDb = require('@polkadot/db');

const definition = require('./definition');

module.exports = function db (baseDb: BaseDbInterface): Db {
  const state = createDb(baseDb, definition);

  state.consensus.authority.set = (value: Uint8Array | BN | number, params?: Array<State$Key$ParamType>) => {
    state.consensus.authority.set(value, params);
    state.consensus['authority(unhashed)'].set(value, params);
  };

  return state;
};
