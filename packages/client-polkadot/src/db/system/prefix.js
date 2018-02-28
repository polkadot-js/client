// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const BLOCK_HASH_AT: Uint8Array = u8aFromString('sys:old:');
const CODE: Uint8Array = u8aFromString(':code');
const NONCE_OF: Uint8Array = u8aFromString('sys:non:');
const TEMP_TRANSACTION_NUMBER: Uint8Array = u8aFromString('temp:txcount:');

module.exports = {
  BLOCK_HASH_AT,
  CODE,
  NONCE_OF,
  TEMP_TRANSACTION_NUMBER
};
