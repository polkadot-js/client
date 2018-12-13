// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Set, Struct } from '@polkadot/types/codec';
import { BlockNumber, Bytes, Hash, u32 as U32 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class StatusMessage$Roles extends Set {
  constructor (value?: any) {
    super({
      none:      0b00000000,
      full:      0b00000001,
      light:     0b00000010,
      authority: 0b00000100
    }, value);
  }
}

export class StatusMessage extends Struct {
  constructor (value: any) {
    super({
      version: U32,
      roles: StatusMessage$Roles,
      bestNumber: BlockNumber,
      bestHash: Hash,
      genesisHash: Hash,
      chainStatus: Bytes
    }, value);
  }
}

export default class Status extends BaseMessage implements MessageInterface {
  static type = 0;

  constructor (value: any) {
    super(Status.type, new StatusMessage(value));
  }

  get bestHash (): Hash {
    return this.message.get('bestHash') as Hash;
  }

  get bestNumber (): BlockNumber {
    return this.message.get('bestNumber') as BlockNumber;
  }

  get chainStatus (): Bytes {
    return this.message.get('chainStatus') as Bytes;
  }

  get genesisHash (): Hash {
    return this.message.get('genesisHash') as Hash;
  }

  get roles (): StatusMessage$Roles {
    return this.message.get('roles') as StatusMessage$Roles;
  }

  get version (): U32 {
    return this.message.get('version') as U32;
  }
}
