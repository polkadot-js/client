// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pConfigType, P2pInterface } from '@polkadot/client-p2p/types';

const { DevP2p, LibP2p } = require('@polkadot/client-p2p');
const defaults = require('@polkadot/client-p2p/defaults');

module.exports = function initP2p ({ address, maxPeers, port, type }: P2pConfigType): P2pInterface {
  switch (type) {
    case 'devp2p':
      return new DevP2p({
        address,
        maxPeers,
        port,
        privateKey: defaults.PRIVATE_KEY
      });

    case 'libp2p':
      return new LibP2p({
        address,
        maxPeers,
        port,
        privateKey: defaults.PRIVATE_KEY
      });

    default:
      throw new Error(`Unable to create unknown p2p type '${type || ''}'`);
  }
};
