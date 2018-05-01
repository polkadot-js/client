// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Key, StorageDef$Key$Values } from '../types';
import type { Keygen } from './types';

const isU8a = require('@polkadot/util/is/u8a');
const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const xxhash = require('@polkadot/util-crypto/xxhash/asU8a128');

const formatParams = require('./params');

module.exports = function createKey ({ isUnhashed = false, key, params = {} }: StorageDef$Key): Keygen {
  const prefix = isU8a(key)
    // flowlint-next-line unclear-type:off
    ? ((key: any): Uint8Array)
    // flowlint-next-line unclear-type:off
    : u8aFromString(((key: any): string));

  return (...keyParams: StorageDef$Key$Values): Uint8Array => {
    const postfix = keyParams.length !== 0
      ? u8aConcat.apply(null, formatParams(params, keyParams))
      : new Uint8Array([]);
    const prefixedKey = u8aConcat(prefix, postfix);

    return isUnhashed
      ? prefixedKey
      : xxhash(prefixedKey);
  };
};
