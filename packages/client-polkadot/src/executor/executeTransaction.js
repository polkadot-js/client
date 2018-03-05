// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const call = require('./callAsU8a');

module.exports = function executeTransaction (self: PolkadotState, header: Uint8Array, utx: Uint8Array): Uint8Array {
  return call(self, 'execute_transaction')(
    u8aConcat([ header, utx ])
  );
};
