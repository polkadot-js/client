// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { PeerState } from './types';

module.exports = function setBest (self: PeerState, number: BN, hash: Uint8Array): void {
  self.bestHash = hash;
  self.bestNumber = number;
};
