// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbState } from './types';

module.exports = function get ({ backend, pending }: DbState, k: Uint8Array): Uint8Array {
  const value = pending[k];

  if (value) {
    return value.v
      ? value.v.slice()
      : new Uint8Array([]);
  }

  return backend.get(k);
};
