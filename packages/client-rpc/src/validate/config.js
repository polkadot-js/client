// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcConfig } from '../types';

const assert = require('@polkadot/util/assert');

const { TYPES } = require('../defaults');

module.exports = function validateConfig ({ path, types }: RpcConfig): void {
  assert(/^\//.test(path), 'Expected valid path');
  assert(types.length !== 0, 'Expected non-empty type Array');

  const invalid = types
    .filter((_type) => !TYPES.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
};
