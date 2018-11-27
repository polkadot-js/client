// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { JsonRpcError } from '../types';

import { ExtError } from '@polkadot/util';

import createJson from './json';

export default function createError (id: number, error: Error | ExtError): JsonRpcError {
  return createJson(id, {
    error: {
      code: (error as ExtError).code || ExtError.CODES.UNKNOWN,
      message: error.message
    }
  } as JsonRpcError);
}
