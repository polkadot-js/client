// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { JsonRpcError } from '../types';

const ExtError = require('@polkadot/util/ext/error');

const createJson = require('./json');

module.exports = function createError (id: number, error: Error | ExtError): JsonRpcError {
  return createJson(id, ({
    error: {
      // flowlint-next-line unclear-type:off
      code: ((error: any): ExtError).code || ExtError.CODES.UNKNOWN,
      message: error.message
    }
  }: $Shape<JsonRpcError>));
};
