// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RpcConfigType } from '../types';

const assert = require('@polkadot/util/assert');
const isNumber = require('@polkadot/util/is/number');

const { TYPE } = require('../defaults');

module.exports = function validateConfig ({ path, port, type }: RpcConfigType): void {
  assert(/^\//.test(path), 'Expected valid path');
  assert(isNumber(port), 'Expected a numeric port');
  assert(Array.isArray(type), 'Expected type as an Array');
  assert(type.length !== 0, 'Expected non-empty type Array');

  const invalid = type
    .filter((_type) => !TYPE.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
};
