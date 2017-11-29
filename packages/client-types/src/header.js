// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { BytesType, HashType, BlockNumberType } from './base';

export type DigestType$Log = BytesType;

export type DigestType = {
  parachain_activity_bitfield: BytesType,
  logs: Array<DigestType$Log>
};

export type HeaderType = {
  parent_hash: HashType,
  number: BlockNumberType,
  state_root: HashType,
  transaction_root: HashType,
  digest: DigestType
};
