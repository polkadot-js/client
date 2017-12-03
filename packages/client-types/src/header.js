// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { BytesType, HashType, BlockNumberType } from './base';

export type DigestType$Log = BytesType;

export type DigestType = {
  parachainActivityBitfield: BytesType,
  logs: Array<DigestType$Log>
};

export type HeaderType = {
  parentHash: HashType,
  number: BlockNumberType,
  stateRoot: HashType,
  transactionRoot: HashType,
  digest: DigestType
};
