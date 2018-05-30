// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '../types';

const bindKey = require('../key');

type Creator = (keyParams?: Storage$Key$Values) => Uint8Array;

module.exports = function creator <T> (key: Section$Item<T>): Creator {
  const keyCreator = bindKey(key);

  return (keyParams?: Storage$Key$Values = []): Uint8Array =>
    keyCreator.apply(null, keyParams);
};
