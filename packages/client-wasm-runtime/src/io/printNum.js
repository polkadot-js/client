// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';

const BN = require('bn.js');

module.exports = function printNum (l: Logger, hi: number, lo: number): void {
  l.log(
    new BN(hi)
      .iushln(32)
      .iaddn(lo)
      .toString()
  );
};
