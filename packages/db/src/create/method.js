// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { State$Method, State$Key$ParamType, State$Definition$Key, WrapDbInterface } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const isU8a = require('@polkadot/util/is/u8a');

const bindKey = require('../key');
const formatParams = require('./params');

module.exports = function expandMethod ({ isUnhashed = false, key, params, type }: State$Definition$Key, db: WrapDbInterface): State$Method {
  const keyCreator = bindKey(key, isUnhashed);
  const createKey = (inputs?: Array<State$Key$ParamType>): Uint8Array =>
    keyCreator(
      formatParams(inputs, params)
    );

  if (['u32', 'u64'].includes(type)) {
    const bitLength = type === 'u32' ? 32 : 64;

    return {
      get: (...inputs?: Array<State$Key$ParamType>): BN =>
        db.getBn(createKey(inputs), bitLength),
      set: (value: Uint8Array | BN | number, ...inputs?: Array<State$Key$ParamType>): void =>
        db.setBn(createKey(inputs), value, bitLength)
    };
  }

  return {
    get: (...inputs?: Array<State$Key$ParamType>): Uint8Array =>
      db.get(createKey(inputs)),
    set: (value: Uint8Array | BN | number, ...inputs?: Array<State$Key$ParamType>): void =>
      db.set(createKey(inputs), isU8a(value)
        ? value
        // $FlowFixMe type has been determined
        : bnToU8a(value)
      )
  };
};
