// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';

const u8aToString = require('@polkadot/util/u8a/toString');

module.exports = function del (pending: Memory$Storage, backend: BaseDbInterface, k: Uint8Array): void {
  const ks = u8aToString(k);

  pending[ks] = {
    k: k.slice(),
    // $FlowFixMe yes, this shouldn't be null
    v: null
  };
};
