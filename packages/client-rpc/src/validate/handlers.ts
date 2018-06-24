// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Handlers } from '../types';

import assert from '@polkadot/util/assert';
import isFunction from '@polkadot/util/is/function';

export default function validateHandlers (handlers: Handlers = {}): void {
  const handlerKeys = Object.keys(handlers);

  assert(handlerKeys.length !== 0, 'Expected non-empty handler mapping');

  const invalid = handlerKeys
    .filter((key) => !isFunction(handlers[key]))
    .map((key) => `'${key}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid method handlers found: ${invalid}`);
}
