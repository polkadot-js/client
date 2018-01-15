// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';

module.exports = function printNum (l: Logger, num: number): void {
  l.log(num);
};
