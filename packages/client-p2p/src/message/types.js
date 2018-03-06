// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { AccountId, BlockNumber, HeaderHash, ParachainIdType, Signature } from '@polkadot/primitives/base';
import type { Justification } from '@polkadot/primitives/bft';
import type { Header } from '@polkadot/primitives/header';
import type { Role } from '@polkadot/primitives/role';

export type BlockAnnounceMessage = {
  header: BlockHeaderType
}

export type BlockRequestMessage$BlockAttribute = 'header' | 'body' | 'receipt' | 'messageQueue' | 'justification';

export type BlockRequestMessage$Direction = 'ascending' | 'descending';

export type BlockRequestMessage = {
  direction: BlockRequestMessage$Direction,
  fields: Array<BlockRequestMessage$BlockAttribute>,
  from: {
    hash: HeaderHash,
    number: BN
  },
  id: number,
  max: number,
  to: Uint8Array
}

export type BlockResponseMessage$BlockData$Justification = {};

export type BlockResponseMessage$BlockData = {
  hash: HeaderHashType,
  header?: Uint8Array,
  body?: Uint8Array,
  receipt?: Uint8Array,
  messageQueue?: Uint8Array,
  justification?: JustificationType,
}

export type BlockResponseMessage = {
  id: number,
  blocks: Array<BlockResponseMessage$BlockData>,
}

export type StatusMessage = {
  bestHash: HeaderHashType,
  bestNumber: BlockNumberType,
  genesisHash: HeaderHashType,
  parachainId: ParachainIdType,
  roles: Array<RoleType>,
  validatorSignature: SignatureType,
  validatorId: AccountIdType,
  version: number
}

export type MessageImpl = {
  // flowlint-next-line unclear-type:off
  raw: any,
  // flowlint-next-line unclear-type:off
  rawDecode: (data: Array<*>) => any,
  rawEncode: () => Array<*>
};

export type MessageState = {
  id: number,
  impl: MessageImpl
};
