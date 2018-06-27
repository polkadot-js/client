// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { PeerState } from './types';

// tslint:disable-next-line:variable-name
export default function setBest (self: PeerState, number: BN, hash: Uint8Array): void {
  self.bestHash = hash;
  self.bestNumber = number;
}
