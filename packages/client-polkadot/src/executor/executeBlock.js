// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

const call = require('./call');

module.exports = function executeBlock (self: PolkadotState, block: Uint8Array): boolean {
  // self.l.log('Executing block');

  const result = call(self, 'execute_block')(block);

  return result.lo === 1;
};
