// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb, WrapDb } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');

const debug = require('./debug');

module.exports = function wrap (db: BaseDb): WrapDb {
  return {
    ...db,
    debug: (): { [string]: string } =>
      debug(db),
    trieRoot: (): Uint8Array =>
      trieRoot(db.pairs())
  };
};
