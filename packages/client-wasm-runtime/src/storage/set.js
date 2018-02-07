// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

module.exports = function set (storage: BaseDbInterface, key: Uint8Array, data: Uint8Array): void {
  storage.set(key, data);
};
