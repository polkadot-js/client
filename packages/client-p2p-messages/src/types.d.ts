// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import { Justification } from '@polkadot/primitives/bft';
import { Header } from '@polkadot/primitives/header';
import { JsonHeader } from '@polkadot/primitives/json/types';
import { Role } from '@polkadot/primitives/role';

export interface MessageEncoder <M> {
  readonly type: number;

  encode (): M;
}

export type MessageInterface = MessageEncoder<any>;

export interface MessageDecoder <M, C> {
  readonly type: number;

  decode (input: M): C;
}

export type BlockAnnounceEncoded = {
  BlockAnnounce: {
    header: JsonHeader
  }
};

export interface BlockAnnounceMessage {
  header: Header
}

export type BlockRequestEncoded = {
  BlockRequest: {
    direction: BlockRequestMessageDirection,
    fields: Array<BlockRequestMessageField>,
    from: string | number,
    id: number,
    max: number,
    to?: string | number | null
  }
};

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

export type BlockResponseEncodedBlock = {
  hash: string,
  header: Header,
  body: Array<Array<number>>,
  receipt: null,
  messageQueue: null,
  justification: Justification
};

export type BlockResponseEncoded = {
  BlockResponse: {
    id: number,
    blocks: Array<BlockResponseEncodedBlock>
  }
};

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

export type StatusEncoded = {
  Status: {
    best_hash: string,
    best_number: number,
    genesis_hash: string,
    parachain_id?: string | null,
    roles: Array<string>,
    validator_id?: string | null,
    validator_signature?: string | null,
    version: number
  }
};

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
