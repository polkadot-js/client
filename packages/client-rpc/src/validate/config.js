// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RpcConfigType } from '../types';

const assert = require('@polkadot/util/assert');

const { TYPES } = require('../defaults');

module.exports = function validateConfig ({ path, types }: RpcConfigType): void {
  assert(/^\//.test(path), 'Expected valid path');
  assert(types.length !== 0, 'Expected non-empty type Array');

  const invalid = types
    .filter((_type) => !TYPES.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
};
