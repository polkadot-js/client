// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { StateInterface } from '@polkadot/client-state/types';
import type { ConfigType } from '../types';

const State = require('@polkadot/client-state');

module.exports = function createState (config: ConfigType, chain: ChainConfigType): StateInterface {
  return new State(chain);
};
