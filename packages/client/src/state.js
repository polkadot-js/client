// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ConfigType, StateInterface } from '@polkadot/client-state/types';

const State = require('@polkadot/client-state');

module.exports = function initState (config: ConfigType): StateInterface {
  return new State(config);
};
