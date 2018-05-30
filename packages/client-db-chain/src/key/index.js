// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '../types';
import type { Keygen } from './types';

const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const xxhash = require('@polkadot/util-crypto/xxhash/asU8a');

const formatParams = require('./params');

module.exports = function createKey <T> ({ isUnhashed, key, params }: Section$Item<T>): Keygen {
  const prefix = u8aFromString(key);

  return (...keyParams: Storage$Key$Values): Uint8Array => {
    const postfix = keyParams.length !== 0
      ? u8aConcat.apply(null, formatParams(params, keyParams))
      : new Uint8Array([]);
    const prefixedKey = u8aConcat(prefix, postfix);

    return isUnhashed
      ? prefixedKey
      : xxhash(prefixedKey, 128);
  };
};
