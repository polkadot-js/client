// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { StateInterface } from '@polkadot/client-state/types';

const State = require('@polkadot/client-state');

module.exports = function initState (chain: ChainConfigType): StateInterface {
  return new State(chain);
};
