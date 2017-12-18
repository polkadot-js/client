// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { StateInterface } from '@polkadot/client-state/types';

const P2p = require('@polkadot/client-p2p');

module.exports = function initP2p (state: StateInterface): P2pInterface {
  return new P2p(state);
};
