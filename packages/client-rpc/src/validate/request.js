// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isNumber = require('@polkadot/util/is/number');
const isUndefined = require('@polkadot/util/is/undefined');

module.exports = function validateRequest (id: number, jsonrpc: string): void {
  assert(jsonrpc === '2.0', `Invalid jsonrpc field, expected '2.0', got '${jsonrpc}'`, ExtError.CODES.INVALID_JSONRPC);

  assert(!isUndefined(id), `Expected a defined id, received '${id}'`, ExtError.CODES.INVALID_JSONRPC);

  assert(isNumber(id), `Expected a numeric id, received '${id}'`, ExtError.CODES.INVALID_JSONRPC);
};
