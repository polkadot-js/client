// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { bnToU8a } from '@polkadot/util';

export default class BaseMessage {
  readonly type: number;

  constructor (type: number) {
    this.type = type;
  }

  encode (): Uint8Array {
    return bnToU8a(this.type, 8, true);
  }
}
