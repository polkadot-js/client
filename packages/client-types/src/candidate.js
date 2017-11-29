// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BalanceType, BytesType, ChainIdType, HashType, SignatureType } from './base';

export type CandidateType = {
  parachain_index: ChainIdType,
  collator_signature: SignatureType,
  unprocessed_ingress: Array<Array<Array<BytesType>>>,
  block_data: BytesType
};

export type CandidateReceiptType$BalanceUpload = [AccountIdType, BalanceType];
export type CandidateReceiptType$EgressQueueRoot = [ChainIdType, HashType];

export type CandidateReceiptType = {
  parachain_index: ChainIdType,
  collator: AccountIdType,
  head_data: BytesType,
  balance_uploads: Array<CandidateReceiptType$BalanceUpload>,
  egress_queue_roots: Array<CandidateReceiptType$EgressQueueRoot>,
  fees: BalanceType
};
