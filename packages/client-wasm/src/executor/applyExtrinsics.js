// Copyright 2017-2018 @polkadot/client-wasm authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const encodeLength = require('@polkadot/extrinsics-codec/encode/length');

const call = require('./call');

module.exports = function applyExtrinsic (self: ExecutorState, extrinsics: Array<UncheckedRaw>): boolean {
  const start = Date.now();

  self.l.debug(() => 'Apply extrinsics');

  const executor = call(self, 'apply_extrinsic');
  const result = extrinsics.reduce((result, extrinsic) =>
    result && executor(encodeLength(extrinsic)).bool, true);

  self.l.debug(() => `Apply extrinsics completed (${Date.now() - start}ms)`);

  return result;
};
