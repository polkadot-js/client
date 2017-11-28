// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { TAccountID, TBalance, Tbytes, TChainID, THash, TSignature } from './base';

export type TCandidate = {
  parachain_index: TChainID,
  collator_signature: TSignature,
  unprocessed_ingress: Array<Array<Array<Tbytes>>>,
  block_data: Tbytes
};

export type TCandidateReceipt$BalanceUpload = [TAccountID, TBalance];
export type TCandidateReceipt$EgressQueueRoot = [TChainID, THash];

export type TCandidateReceipt = {
  parachain_index: TChainID,
  collator: TAccountID,
  head_data: Tbytes,
  balance_uploads: Array<TCandidateReceipt$BalanceUpload>,
  egress_queue_roots: Array<TCandidateReceipt$EgressQueueRoot>,
  fees: TBalance
};
