// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export default function createJson<T> (id?: number, body?: T): T {
  return Object.assign({
    id,
    jsonrpc: '2.0'
  }, body);
}
