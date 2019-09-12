// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, isNumber } from '@polkadot/util';

export default function validateRequest (id: number, jsonrpc: string): void {
  assert(jsonrpc === '2.0', 'Invalid jsonrpc field, expected \'2.0\'');
  assert(isNumber(id), 'Expected a numeric id');
}
