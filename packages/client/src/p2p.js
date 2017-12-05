// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { ConfigType } from './cli/types';

const P2p = require('@polkadot/client-p2p');

module.exports = function initP2p ({ role, p2p: { address, maxPeers, port } }: ConfigType): P2pInterface {
  return new P2p({
    address,
    maxPeers,
    port,
    role
  });
};
