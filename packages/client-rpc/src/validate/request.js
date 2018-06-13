// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isNumber = require('@polkadot/util/is/number');

module.exports = function validateRequest (id: number, jsonrpc: string): void {
  assert(jsonrpc === '2.0', `Invalid jsonrpc field, expected '2.0'`, ExtError.CODES.INVALID_JSONRPC);
  assert(isNumber(id), `Expected a numeric id`, ExtError.CODES.INVALID_JSONRPC);
};
