// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { StateInterface } from '@polkadot/client-state/types';
import type { ConfigType } from '../types';

const State = require('@polkadot/client-state');

module.exports = function createState (config: ConfigType, chain: ChainConfigType): StateInterface {
  return new State(chain);
};
