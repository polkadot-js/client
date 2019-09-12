// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { JsonRpcError } from '../types';

import createJson from './json';

export default function createError (id: number, error: Error): JsonRpcError {
  return createJson(id, {
    error: {
      code: -1,
      message: error.message
    }
  });
}
