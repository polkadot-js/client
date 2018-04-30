// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Method, State$Key$ParamValues, State$Definition$Key, WrapDbInterface } from '../types';

const bindKey = require('../key');
const methodBn = require('./methodBn');
const methodU8a = require('./methodU8a');

module.exports = function expandMethod (key: State$Definition$Key, db: WrapDbInterface): State$Method {
  const keyCreator = bindKey(key);
  const createKey = (keyParams?: State$Key$ParamValues): Uint8Array =>
    keyCreator.apply(null, keyParams || []);

  return ['BlockNumber', 'u32', 'u64'].includes(key.type)
    ? methodBn(key, createKey, db)
    : methodU8a(key, createKey, db);
};
