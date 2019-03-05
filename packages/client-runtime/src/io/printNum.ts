// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';

import BN from 'bn.js';

export default function printNum (l: Logger, hi: number, lo: number): void {
  l.warn(
    new BN(hi)
      .iushln(32)
      .iaddn(lo)
      .toString()
  );
}
