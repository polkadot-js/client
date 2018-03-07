// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import type { Justification } from '@polkadot/primitives/bft';
import type { Header } from '@polkadot/primitives/header';
import type { Role } from '@polkadot/primitives/role';

export type BlockAnnounceMessage = {
  header: Header
}

export type BlockRequestMessage$BlockAttribute = 'header' | 'body' | 'receipt' | 'messageQueue' | 'justification';

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

export type BlockResponseMessage = {
  id: number,
  blocks: Array<BlockResponseMessage$BlockData>,
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
  // flowlint-next-line unclear-type:off
  raw: any,
  // flowlint-next-line unclear-type:off
  rawDecode: (data: any) => any,
  // flowlint-next-line unclear-type:off
  rawEncode: () => any
};

export type MessageState = {
  type: number,
  impl: MessageImpl
};
