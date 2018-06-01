// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const call = require('./call');

module.exports = function executeBlock (self: ChainState, code: Uint8Array, block: Uint8Array): boolean {
  self.l.debug(() => 'Executing block');

  const start = Date.now();
  const result = call(self, code, 'execute_block')(block);

  self.l.debug(() => `Block execution completed (${Date.now() - start}ms)`);

  return result.lo === 1;
};
