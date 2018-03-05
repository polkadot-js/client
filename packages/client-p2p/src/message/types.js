// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { BlockHeaderType } from '@polkadot/primitives/blockHeader';
import type { RoleType } from '@polkadot/primitives/role';

export type BlockAnnounceMessage = {
  header: BlockHeaderType
}

export type BlockRequestMessage = {}

export type BlockResponseMessage = {}

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
