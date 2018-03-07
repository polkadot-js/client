// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const BEST_HASH: Uint8Array = u8aFromString('bst:hsh');
const BEST_NUMBER: Uint8Array = u8aFromString('bst:num');
const BLOCK_BY_HASH: Uint8Array = u8aFromString('blk:hsh:');

module.exports = {
  BEST_HASH,
  BEST_NUMBER,
  BLOCK_BY_HASH
};
