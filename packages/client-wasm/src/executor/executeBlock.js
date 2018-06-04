// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';

const call = require('./call');

module.exports = function executeBlock (self: ExecutorState, block: Uint8Array): boolean {
  const start = Date.now();

  self.l.debug(() => 'Executing block');

  // FIXME Not sure why this is needed, this may be due to the implementation with overlays?
  self.stateDb.timestamp.didUpdate.del();
  self.stateDb.parachains.didUpdate.del();

  const result = call(self, 'execute_block')(block);

  self.l.debug(() => `Block execution completed (${Date.now() - start}ms)`);

  return result.lo === 1;
};
