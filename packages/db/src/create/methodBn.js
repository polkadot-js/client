// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { State$Method, State$Key$ParamValues, State$Definition$Key, WrapDbInterface } from '../types';
import type { Creator } from './types';

module.exports = function expandMethodBn (key: State$Definition$Key, createKey: Creator, db: WrapDbInterface): State$Method {
  const bitLength = ['u32'].includes(key.type) ? 32 : 64;

  return ({
    getn: (...keyParams?: State$Key$ParamValues): BN =>
      db.getn(createKey(keyParams), bitLength),
    setn: (value: BN | number, ...keyParams?: State$Key$ParamValues): void =>
      db.setn(createKey(keyParams), value, bitLength)
  }: $Shape<State$Method>);
};
