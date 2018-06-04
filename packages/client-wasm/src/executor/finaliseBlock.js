// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';

const call = require('./callAsU8a');

module.exports = function finaliseBlock (self: ExecutorState, header: Uint8Array): Uint8Array {
  const start = Date.now();

  self.l.debug(() => 'Finalising block');

  const result = call(self, 'finalise_block')(header);

  self.l.debug(() => `Block finalised (${Date.now() - start}ms)`);

  return result;
};
