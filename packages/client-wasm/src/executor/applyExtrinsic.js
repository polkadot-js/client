// Copyright 2017-2018 @polkadot/client-wasm authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const encodeLength = require('@polkadot/extrinsics-codec/encode/length');

const call = require('./call');

module.exports = function applyExtrinsic (self: ExecutorState, extrinsic: UncheckedRaw): boolean {
  const start = Date.now();

  self.l.debug(() => 'Apply extrinsic');

  const result = call(self, 'apply_extrinsic')(
    encodeLength(extrinsic)
  );

  self.l.debug(() => `Apply extrinsic completed (${Date.now() - start}ms)`);

  return result.bool;
};
