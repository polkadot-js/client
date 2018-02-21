// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface$System } from '../types';

module.exports = function system (db: BaseDbInterface): PolkadotInterface$System {
  return {};
};
