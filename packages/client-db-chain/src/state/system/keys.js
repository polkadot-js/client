// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  BLOCK_HASH_AT: key('sys:old:'),
  CODE: key(':code', false),
  NONCE_OF: key('sys:non:'),
  TEMP_TRANSACTION_NUMBER: key('temp:txcount:')
};
