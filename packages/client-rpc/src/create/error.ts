// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { JsonRpcError } from '../types';

import ExtError from '@polkadot/util/ext/error';

import createJson from './json';

export default function createError (id: number, error: Error | ExtError): JsonRpcError {
  return createJson(id, ({
    error: {
      code: ((error: any): ExtError).code || ExtError.CODES.UNKNOWN,
      message: error.message
    }
  }: $Shape<JsonRpcError>));
}
