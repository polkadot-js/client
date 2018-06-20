// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import assert from '@polkadot/util/assert';
import ExtError from '@polkadot/util/ext/error';
import isNumber from '@polkadot/util/is/number';

export default function validateRequest (id: number, jsonrpc: string): void {
  assert(jsonrpc === '2.0', `Invalid jsonrpc field, expected '2.0'`, ExtError.CODES.INVALID_JSONRPC);
  assert(isNumber(id), `Expected a numeric id`, ExtError.CODES.INVALID_JSONRPC);
}
