// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { JsonRpcError } from '../types';

const ExtError = require('@polkadot/util/ext/error');

module.exports = function createError (id: number, error: Error | ExtError): JsonRpcError {
  return {
    id,
    jsonrpc: '2.0',
    error: {
      code: ((error: any): ExtError).code || ExtError.CODES.UNKNOWN,
      message: error.message
    }
  };
};
