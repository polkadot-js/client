// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { SignatureType } from './base';
import type { HeaderType } from './header';
import type { TransactionType } from './transaction';

export type BlockType = {
  header: HeaderType,
  transactions: Array<TransactionType>,
  signatures: Array<SignatureType>
};
