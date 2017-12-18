// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RpcConfigType } from '../types';

const assert = require('@polkadot/util/assert');

const { TYPE } = require('../defaults');

module.exports = function validateConfig ({ path, type }: RpcConfigType): void {
  assert(/^\//.test(path), 'Expected valid path');
  assert(type.length !== 0, 'Expected non-empty type Array');

  const invalid = type
    .filter((_type) => !TYPE.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
};
