// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import { Justification } from '@polkadot/primitives/bft';
import { Header } from '@polkadot/primitives/header';
import { JsonHeader } from '@polkadot/primitives/json/types';
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
  from: HeaderHash | BN,
  id: number,
  max?: number | null,
  to?: HeaderHash | null
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
  bestHash: HeaderHash,
  bestNumber: BlockNumber,
  genesisHash: HeaderHash,
  roles: Array<Role>,
  version: number
}

export interface TransactionsMessage {
  transactions: Array<Uint8Array>
}
