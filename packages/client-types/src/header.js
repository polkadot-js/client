// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { Tbytes, THash, TBlockNumber } from './base';

export type TDigest$Log = Tbytes;

export type TDigest = {
  parachain_activity_bitfield: Tbytes,
  logs: Array<TDigest$Log>
};

export type THeader = {
  parent_hash: THash,
  number: TBlockNumber,
  state_root: THash,
  transaction_root: THash,
  digest: TDigest
};
