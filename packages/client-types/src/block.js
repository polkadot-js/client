// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { TSignature } from './base';
import type { THeader } from './header';
import type { TTransaction } from './transaction';

export type TBlock = {
  header: THeader,
  transactions: Array<TTransaction>,
  signatures: Array<TSignature>
};
