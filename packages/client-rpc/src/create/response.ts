// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { JsonRpcResponse } from '../types';

import createJson from './json';

export default function createResponse (id: number, result: any): JsonRpcResponse {
  return createJson(id, {
    result
  } as JsonRpcResponse);
}
