// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';

const call = require('./call');

module.exports = function initialiseBlock (self: ExecutorState, header: Uint8Array): boolean {
  const start = Date.now();

  self.l.debug(() => 'Initialising block');

  const result = call(self, 'initialise_block')(header);

  self.l.debug(() => `Block initialised (${Date.now() - start}ms)`);

  return result.bool;
};
