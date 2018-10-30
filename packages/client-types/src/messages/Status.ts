// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from '../role/types';
import { MessageInterface, StatusMessage } from './types';

import { BlockNumber, Hash } from '@polkadot/types';
import { bnToU8a, u8aConcat, u8aToBn } from '@polkadot/util';

import { roleFromId, roleToId } from '../role';
import BaseMessage from './BaseMessage';

const ROLES_OFF = 4;
const BEST_OFF = ROLES_OFF + 1;
const HASH_OFF = BEST_OFF + 8;
const GEN_OFF = HASH_OFF + 32;
const CHAIN_OFF = GEN_OFF + 32;

export default class Status extends BaseMessage implements MessageInterface, StatusMessage {
  static type = 0;

  bestHash: Hash;
  bestNumber: BlockNumber;
  chainStatus: Uint8Array;
  genesisHash: Hash;
  roles: Array<Role>;
  version: number;

  constructor ({ bestHash, bestNumber, genesisHash, roles, version }: StatusMessage) {
    super(Status.type);

    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
    this.chainStatus = new Uint8Array([1]);
    this.genesisHash = genesisHash;
    this.roles = roles;
    this.version = version;
  }

  encode (): Uint8Array {
    return u8aConcat(
      super.encode(),
      bnToU8a(this.version, 32, true),
      bnToU8a(roleToId(this.roles), 8, true),
      bnToU8a(this.bestNumber.toBn(), 64, true),
      this.bestHash.toU8a(),
      this.genesisHash.toU8a(),
      bnToU8a(this.chainStatus.length, 32, true),
      this.chainStatus
    );
  }

  toJSON (): any {
    return {
      bestNumber: this.bestNumber.toHex(),
      bestHash: this.bestHash.toHex(),
      genesisHash: this.genesisHash.toHex(),
      roles: this.roles
    };
  }

  static decode (u8a: Uint8Array): Status {
    return new Status({
      version: u8aToBn(u8a.subarray(0, ROLES_OFF), true).toNumber(),
      roles: roleFromId(u8a[ROLES_OFF]),
      bestNumber: new BlockNumber(u8a.subarray(BEST_OFF, HASH_OFF)),
      bestHash: new Hash(u8a.slice(HASH_OFF, GEN_OFF)),
      genesisHash: new Hash(u8a.slice(GEN_OFF, CHAIN_OFF))
      // ignoring chainStatus for now
    });
  }
}
