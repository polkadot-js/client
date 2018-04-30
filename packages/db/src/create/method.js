// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { State$Method, State$Key$ParamType, State$Definition$Key, WrapDbInterface } from '../types';

const bindKey = require('../key');
const formatParams = require('./params');

module.exports = function expandMethod ({ isUnhashed = false, key, params, type }: State$Definition$Key, db: WrapDbInterface): State$Method {
  const keyCreator = bindKey(key, isUnhashed);
  const createKey = (values?: Array<State$Key$ParamType>): Uint8Array =>
    keyCreator.apply(null,
      formatParams(values, params)
    );

  if (['u32', 'u64'].includes(type)) {
    const bitLength = type === 'u32' ? 32 : 64;

    return ({
      getn: (...inputs?: Array<State$Key$ParamType>): BN =>
        db.getn(createKey(inputs), bitLength),
      setn: (value: BN | number, ...inputs?: Array<State$Key$ParamType>): void =>
        db.setn(createKey(inputs), value, bitLength)
    }: $Shape<State$Method>);
  }

  return ({
    get: (...inputs?: Array<State$Key$ParamType>): Uint8Array =>
      db.get(createKey(inputs)),
    set: (value: Uint8Array, ...inputs?: Array<State$Key$ParamType>): void =>
      db.set(createKey(inputs), value)
  }: $Shape<State$Method>);
};
