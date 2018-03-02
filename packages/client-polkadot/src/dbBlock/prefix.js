// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const BLOCK_BY_HASH: Uint8Array = u8aFromString('blk:hsh:');
const LATEST_HASH: Uint8Array = u8aFromString('lat:hsh');
const LATEST_NUMBER: Uint8Array = u8aFromString('lat:num');

module.exports = {
  BLOCK_BY_HASH,
  LATEST_HASH,
  LATEST_NUMBER
};
