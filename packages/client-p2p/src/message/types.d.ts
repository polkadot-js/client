// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import { Justification } from '@polkadot/primitives/bft';
import { Header } from '@polkadot/primitives/header';
import { Role } from '@polkadot/primitives/role';
import { MessageInterface } from '../types';

export type MessageFactory<T> = {
  (message: T): MessageInterface,
  TYPE: number
}

export type BlockAnnounceMessage = {
  header: Header
}

export type BlockRequestMessage$BlockAttribute = 'header' | 'body' | 'receipt' | 'messageQueue' | 'justification';

export type BlockRequestMessage$Fields = Array<BlockRequestMessage$BlockAttribute>;

export type BlockRequestMessage$Direction = 'ascending' | 'descending';

export type BlockRequestMessage = {
  direction: BlockRequestMessage$Direction,
  fields: Array<BlockRequestMessage$BlockAttribute>,
  from: HeaderHash | BN,
  id: number,
  max: number,
  to: HeaderHash
}

export type BlockResponseMessage$BlockData$Justification = {};

export type BlockResponseMessage$BlockData = {
  hash: HeaderHash,
  header?: Uint8Array,
  body?: Uint8Array,
  receipt?: Uint8Array,
  messageQueue?: Uint8Array,
  justification?: Justification,
}

export type BlockResponseMessage$Blocks = Array<BlockResponseMessage$BlockData>;

export type BlockResponseMessage = {
  id: number,
  blocks: BlockResponseMessage$Blocks,
}

export type StatusMessage = {
  bestHash: HeaderHash,
  bestNumber: BlockNumber,
  genesisHash: HeaderHash,
  parachainId: ParaChainId,
  roles: Array<Role>,
  validatorSignature: Signature,
  validatorId: AccountId,
  version: number
}

export type MessageImpl = {
  raw: any,
  rawDecode: (data: any) => any,
  rawEncode: () => any
};

export type MessageState = {
  type: number,
  impl: MessageImpl
};
