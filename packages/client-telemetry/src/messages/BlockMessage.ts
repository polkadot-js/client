// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Message, BlockJson } from './types';

import BN from 'bn.js';
import u8aToHex from '@polkadot/util/u8a/toHex';

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
      // NOTE the endpoint expects non-prefixed values, as much as I hate doing it...
      best: u8aToHex(this.bestHash).slice(2),
      height: this.bestNumber.toNumber()
    };
  }
}
