// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

module.exports = {
  BLOCK_HASH_AT: u8aFromString('sys:old:'),
  CODE: u8aFromString(':code'),
  NONCE_OF: u8aFromString('sys:non:'),
  TEMP_TRANSACTION_NUMBER: u8aFromString('temp:txcount:')
};
