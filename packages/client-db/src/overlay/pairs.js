// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, Db$Pairs } from '../types';
import type { Memory$Storage } from '../memory/types';

module.exports = function pairs (pending: Memory$Storage, backend?: BaseDbInterface): Db$Pairs {
  return (backend ? backend.pairs() : [])
    .concat(
      Object
        .keys(pending)
        .map((key) => pending[key])
    );
};
