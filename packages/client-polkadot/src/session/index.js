// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface$Session } from '../types';

module.exports = function session (db: BaseDbInterface): PolkadotInterface$Session {
  return {};
};
