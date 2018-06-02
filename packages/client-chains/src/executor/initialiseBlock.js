// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const call = require('./callAsU8a');

module.exports = function initialiseBlock (self: ChainState, code: Uint8Array, header: Uint8Array): Uint8Array {
  self.l.debug(() => 'Initialising block');

  const start = Date.now();
  const result = call(self, code, 'initialise_block')(header);

  self.l.debug(() => `Block initialised (${Date.now() - start}ms)`);

  return result;
};
