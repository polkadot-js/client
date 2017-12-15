// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HandlersType } from '../types';

const assert = require('@polkadot/util/assert');
const isFunction = require('@polkadot/util/is/function');
const isObject = require('@polkadot/util/is/object');

module.exports = function validateHandlers (handlers: HandlersType = {}): void {
  assert(isObject(handlers), 'Expected handler mapping object');

  const handlerKeys = Object.keys(handlers);

  assert(handlerKeys.length !== 0, 'Expected non-empty handler mapping');

  const invalid = handlerKeys
    .filter((key) => !isFunction(handlers[key]))
    .map((key) => `'${key}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid method handlers found: ${invalid}`);
};
