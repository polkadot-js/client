// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const BLOCK_HASH_AT: Uint8Array = u8aFromString('sys:old:');
const CODE: Uint8Array = u8aFromString('sys:cod');
const NONCE_OF: Uint8Array = u8aFromString('sys:non:');

module.exports = {
  BLOCK_HASH_AT,
  CODE,
  NONCE_OF
};
