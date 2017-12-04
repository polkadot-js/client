// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BalanceType, BytesType, ChainIdType, HashType, SignatureType } from './base';

export type CandidateType = {
  parachainIndex: ChainIdType,
  collatorSignature: SignatureType,
  unprocessedIngress: Array<Array<Array<BytesType>>>,
  blockData: BytesType
};

export type CandidateReceiptType$BalanceUpload = [AccountIdType, BalanceType];
export type CandidateReceiptType$EgressQueueRoot = [ChainIdType, HashType];

export type CandidateReceiptType = {
  parachainIndex: ChainIdType,
  collator: AccountIdType,
  headData: BytesType,
  balanceUploads: Array<CandidateReceiptType$BalanceUpload>,
  egressQueueRoots: Array<CandidateReceiptType$EgressQueueRoot>,
  fees: BalanceType
};
