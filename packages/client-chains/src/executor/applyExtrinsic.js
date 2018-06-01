// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const call = require('./callAsU8a');

module.exports = function applyExtrinsic (self: ChainState, header: Uint8Array, utx: Uint8Array): Uint8Array {
  self.l.debug(() => 'Apply extrinsic');

  const start = Date.now();
  const result = call(self, 'apply_extrinsic')(
    u8aConcat(header, utx)
  );

  self.l.debug(() => `Apply extrinsic completed (${Date.now() - start}ms)`);

  return result;
};
