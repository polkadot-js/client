// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { BytesType, ObjectIdType, SignatureType, TxOrderType } from './base';

export type TransactionType$Param = any;

export type TransactionType = {
  destination: ObjectIdType,
  function_name: BytesType,
  parameters: Array<TransactionType$Param>
};

export type UnsignedTransactionType = {
  tx: TransactionType,
  nonce: TxOrderType
};

export type SignedTransactionType = {
  unsigned: UnsignedTransactionType,
  signature: SignatureType
};
