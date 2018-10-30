// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, Header, Hash, ParachainId, Signature } from '@polkadot/types';
import { Justification } from '@polkadot/types/Bft';
import { Role } from '@polkadot/client-types/role/types';
import { bufferToU8a } from '@polkadot/util';

export interface MessageInterface {
  readonly type: number;

  encode (): Uint8Array;
  toJSON (): any;
}

export interface MessageDecoder <C> {
  readonly type: number;

  decode (input: Uint8Array): C;
}

export interface BftMessage {
}

export interface BlockAnnounceMessage {
  header: Header
}

export type BlockAttrMap = {
  header: number,
  body: number,
  receipt: number,
  messageQueue: number,
  justification: number
};

export type BlockAttr = keyof BlockAttrMap;

export type BlockRequestMessageDirection = 'Ascending' | 'Descending';

export type BlockRequestMessage = {
  direction?: BlockRequestMessageDirection,
  fields?: Array<BlockAttr>,
  from: Hash | BN,
  id: number,
  max?: number | null,
  to?: Hash | null
}

export type BlockResponseMessageBlock = {
  hash: Uint8Array,
  header: Header,
  encoded: Uint8Array,
  justification: Uint8Array | null // Justification
}

export type BlockResponseMessage = {
  id: number,
  blocks: Array<BlockResponseMessageBlock>,
}

export interface StatusMessage {
  bestHash: Hash,
  bestNumber: BlockNumber,
  genesisHash: Hash,
  roles: Array<Role>,
  version: number
}

export interface TransactionsMessage {
  transactions: Array<Uint8Array>
}
