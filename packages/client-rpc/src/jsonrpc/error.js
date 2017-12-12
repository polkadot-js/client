// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { JsonRpcError } from '../types';

const ExtError = require('@polkadot/util/ext/error');

const createJson = require('./json');

module.exports = function createError (id: number, error: Error | ExtError): JsonRpcError {
  return createJson(id, ({
    error: {
      code: ((error: any): ExtError).code || ExtError.CODES.UNKNOWN,
      message: error.message
    }
  }: $Shape<JsonRpcError>));
};
