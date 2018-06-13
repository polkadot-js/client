// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Handlers } from '../types';

const assert = require('@polkadot/util/assert');
const isFunction = require('@polkadot/util/is/function');

module.exports = function validateHandlers (handlers: Handlers = {}): void {
  const handlerKeys = Object.keys(handlers);

  assert(handlerKeys.length !== 0, 'Expected non-empty handler mapping');

  const invalid = handlerKeys
    .filter((key) => !isFunction(handlers[key]))
    .map((key) => `'${key}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid method handlers found: ${invalid}`);
};
