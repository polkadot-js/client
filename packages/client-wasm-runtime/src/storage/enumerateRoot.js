// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

module.exports = function enumerateRoot (storage: DbInterface, values: Uint8Array, lens: Uint8Array): Uint8Array {
  return new Uint8Array([]);
};
