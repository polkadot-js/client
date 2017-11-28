// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { Tbytes, TObjectID, TSignature, TTxOrder } from './base';

export type TTransaction$Param = any;

export type TTransaction = {
  destination: TObjectID,
  function_name: Tbytes,
  parameters: Array<TTransaction$Param>
};

export type TUnsignedTransaction = {
  tx: TTransaction,
  nonce: TTxOrder
};

export type TSignedTransaction = {
  unsigned: TUnsignedTransaction,
  signature: TSignature
};
