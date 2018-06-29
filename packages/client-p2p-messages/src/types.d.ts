// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import { Justification } from '@polkadot/primitives/bft';
import { Header } from '@polkadot/primitives/header';
import { Role } from '@polkadot/primitives/role';

export interface MessageEncoder <M> {
  type: number;
  encode (): M;
}

export type MessageInterface = MessageEncoder<any>;

export interface MessageDecoder <M, C> {
  type: number;
  decode (input: M): C;
}

export interface BlockAnnounceMessage {
  header: Header
}

export type BlockRequestMessageField = 'Header' | 'Body' | 'Receipt' | 'MessageQueue' | 'Justification';

export type BlockRequestMessageDirection = 'Ascending' | 'Descending';

export type BlockRequestMessage = {
  direction: BlockRequestMessageDirection,
  fields: Array<BlockRequestMessageField>,
  from: HeaderHash | BN,
  id: number,
  max?: number | null,
  to?: HeaderHash | null
}

export type BlockResponseMessageBlock = {
  hash: Uint8Array,
  header: Header,
  importable: Uint8Array,
  justification: Justification,
  number: BN
}

export type BlockResponseMessage = {
  id: number,
  blocks: Array<BlockResponseMessageBlock>,
}

export interface StatusMessage {
  bestHash: HeaderHash,
  bestNumber: BlockNumber,
  genesisHash: HeaderHash,
  parachainId?: ParaChainId | null,
  roles: Array<Role>,
  validatorSignature?: Signature | null,
  validatorId?: AccountId | null,
  version: number
}
