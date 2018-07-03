// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

import BlockMessage from './BlockMessage';

export default class Started extends BlockMessage {
  constructor (bestHash: Uint8Array, bestNumber: BN) {
    super('node.start', bestHash, bestNumber);
  }
}
