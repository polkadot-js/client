// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Method, State$Key$ParamValues, State$Definition$Key, WrapDbInterface } from '../types';
import { Creator } from './types';

module.exports = function expandMethodU8a (key: State$Definition$Key, createKey: Creator, db: WrapDbInterface): State$Method {
  return ({
    get: (...keyParams?: State$Key$ParamValues): Uint8Array =>
      db.get(createKey(keyParams)),
    set: (value: Uint8Array, ...keyParams?: State$Key$ParamValues): void =>
      db.set(createKey(keyParams), value)
  }: $Shape<State$Method>);
};
