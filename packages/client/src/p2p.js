// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { ConfigType } from './cli/types';

const { DevP2p, LibP2p } = require('@polkadot/client-p2p');
const defaults = require('@polkadot/client-p2p/defaults');

module.exports = function initP2p ({ role, p2p: { address, maxPeers, port, type } }: ConfigType): P2pInterface {
  switch (type) {
    case 'devp2p':
      return new DevP2p({
        address,
        maxPeers,
        port,
        privateKey: defaults.PRIVATE_KEY,
        role
      });

    case 'libp2p':
      return new LibP2p({
        address,
        maxPeers,
        port,
        privateKey: defaults.PRIVATE_KEY,
        role
      });

    default:
      throw new Error(`Unable to create unknown p2p type '${type || ''}'`);
  }
};
