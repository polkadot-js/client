// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { StateInterface } from '@polkadot/client-state/types';
import type { ConfigType } from '../types';

const P2p = require('@polkadot/client-p2p');

module.exports = function createP2p (config: ConfigType, state: StateInterface): P2pInterface {
  return new P2p(config, state);
};
