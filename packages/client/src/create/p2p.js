// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { ConfigType } from '../types';

const P2p = require('@polkadot/client-p2p');

module.exports = function createP2p (config: ConfigType, chain: ChainInterface): P2pInterface {
  return new P2p(config, chain);
};
