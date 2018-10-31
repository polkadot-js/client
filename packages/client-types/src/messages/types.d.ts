// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, Header, Hash, ParachainId, Signature } from '@polkadot/types';
import { Justification } from '@polkadot/types/Bft';
import { bufferToU8a } from '@polkadot/util';

export interface MessageInterface {
  readonly type: number;

  encode (): Uint8Array;
  toJSON (): any;
}

export interface MessageDecoder <C> {
  readonly type: number;

  new (value: any): MessageInterface;
}
