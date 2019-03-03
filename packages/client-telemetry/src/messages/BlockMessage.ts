// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Message, BlockJson } from './types';

import BN from 'bn.js';
import { u8aToHex } from '@polkadot/util';

import Base from './Base';

export default class BlockMessage extends Base {
  readonly bestHash: Uint8Array;
  readonly bestNumber: BN;

  constructor (type: Message, bestHash: Uint8Array, bestNumber: BN) {
    super(type);

    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
  }

  toJSON (): BlockJson {
    return {
      ...super.toJSON(),
      best: u8aToHex(this.bestHash),
      height: this.bestNumber.toNumber()
    };
  }
}
