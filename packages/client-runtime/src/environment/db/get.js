// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbState } from './types';

const u8aToString = require('@polkadot/util/u8a/toString');

module.exports = function get ({ backend, pending }: DbState, k: Uint8Array): Uint8Array {
  const ks = u8aToString(k);

  if (pending[ks]) {
    return pending[ks].v
      ? pending[ks].v.slice()
      : new Uint8Array([]);
  }

  return backend.get(k);
};
