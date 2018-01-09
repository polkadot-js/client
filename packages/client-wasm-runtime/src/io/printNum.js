// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from '@polkadot/util/types';

module.exports = function printNum (l: Logger, num: number): void {
  l.log(num);
};
