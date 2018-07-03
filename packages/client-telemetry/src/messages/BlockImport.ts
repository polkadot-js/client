// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Base from './Base';

export default class BlockImport extends Base {
  readonly bestHash: Uint8Array;
  readonly bestNumber: BN;

  constructor (bestHash: Uint8Array, bestNumber: BN) {
    super('block.import');

    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
  }

  toJSON (): any {
    return {
      ...super.toJSON(),
      best: u8aToHex(this.bestHash),
      height: this.bestNumber.toNumber()
    };
  }
}
