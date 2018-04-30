// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbKeygen } from './types';

const isU8a = require('@polkadot/util/is/u8a');
const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const xxhash = require('@polkadot/util-crypto/xxhash/asU8a128');

const EMPTY_KEY = new Uint8Array([]);

module.exports = function key (_prefix: Uint8Array | string, isUnhashed: boolean = false): DbKeygen {
  const prefix = isU8a(_prefix)
    // flowlint-next-line unclear-type:off
    ? ((_prefix: any): Uint8Array)
    // flowlint-next-line unclear-type:off
    : u8aFromString(((_prefix: any): string));

  return (params?: Array<Uint8Array> = []): Uint8Array => {
    const key = params.length
      ? u8aConcat.apply(null, params)
      : EMPTY_KEY;

    const prefixedKey = u8aConcat(prefix, key);

    return isUnhashed
      ? prefixedKey
      : xxhash(prefixedKey);
  };
};
