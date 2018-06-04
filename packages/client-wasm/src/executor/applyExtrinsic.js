// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExtrinsicUncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const call = require('./callAsU8a');

module.exports = function applyExtrinsic (self: ExecutorState, extrinsic: ExtrinsicUncheckedRaw): Uint8Array {
  const start = Date.now();

  self.l.debug(() => 'Apply extrinsic');

  const result = call(self, 'apply_extrinsic')(extrinsic);

  self.l.debug(() => `Apply extrinsic completed (${Date.now() - start}ms)`);

  return result;
};
