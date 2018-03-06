// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

const call = require('./callAsU8a');

module.exports = function finaliseBlock (self: PolkadotState, header: Uint8Array): Uint8Array {
  self.l.debug(() => 'Finalising block');

  const start = Date.now();
  const result = call(self, 'finalise_block')(header);

  self.l.debug(() => `Block finalised (${Date.now() - start}ms)`);

  return result;
};
