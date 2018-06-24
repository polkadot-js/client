// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export default function createJson<T> (id?: number, body?: T): T {
  return Object.assign({
    id,
    jsonrpc: '2.0'
  }, body);
}
