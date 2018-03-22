// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, WrapDbInterface } from '../types';

const getBn = require('./getBn');
const setBn = require('./setBn');

module.exports = function wrap (db: BaseDbInterface): WrapDbInterface {
  const { clear, commit, del, isEmpty, get, pairs, set } = db;

  return {
    clear,
    commit,
    del,
    isEmpty,
    get,
    pairs,
    set,
    getBn32: getBn(db, 32),
    setBn32: setBn(db, 32),
    getBn64: getBn(db, 64),
    setBn64: setBn(db, 64)
  };
};
