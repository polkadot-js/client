// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RpcConfigType } from '../types';

const assert = require('@polkadot/util/assert');
const isNumber = require('@polkadot/util/is/number');

const { TYPE } = require('../defaults');

const TYPE_OR: string = TYPE.map((type) => `'${type}'`).join(' or ');

module.exports = function validateConfig ({ path, port, type }: RpcConfigType): void {
  assert(isNumber(port), `Cannot instantiate with non-numeric port='${port}'`);

  assert(Array.isArray(type), `Type should be specified as an Array containing ${TYPE_OR}`);

  assert(type.length !== 0, `Type should have at least one of ${TYPE_OR}`);

  const invalid = type
    .filter((_type) => !TYPE.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
};
