// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BlockNumber, Hash } from '@polkadot/types/interfaces';
import { MessageInterface } from './types';

import { Set, Struct } from '@polkadot/types/codec';
import { Bytes, u32 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class StatusMessageRoles extends Set {
  public constructor (value?: any) {
    super({
      none: 0b00000000,
      full: 0b00000001,
      light: 0b00000010,
      authority: 0b00000100
    }, value);
  }
}

export class StatusMessage extends Struct {
  public constructor (value: any) {
    super({
      version: 'u32',
      minSupportedVersion: 'u32',
      roles: StatusMessageRoles,
      bestNumber: 'BlockNumber',
      bestHash: 'Hash',
      genesisHash: 'Hash',
      chainStatus: Bytes
    }, value);
  }
}

export default class Status extends BaseMessage implements MessageInterface {
  public static type = 0;

  public constructor (value: any) {
    super(Status.type, new StatusMessage(value));
  }

  public get bestHash (): Hash {
    return this.message.get('bestHash') as Hash;
  }

  public get bestNumber (): BlockNumber {
    return this.message.get('bestNumber') as BlockNumber;
  }

  public get chainStatus (): Bytes {
    return this.message.get('chainStatus') as Bytes;
  }

  public get genesisHash (): Hash {
    return this.message.get('genesisHash') as Hash;
  }

  public get minSupportedVersion (): u32 {
    return this.message.get('minSupportedVersion') as u32;
  }

  public get roles (): StatusMessageRoles {
    return this.message.get('roles') as StatusMessageRoles;
  }

  public get version (): u32 {
    return this.message.get('version') as u32;
  }
}
