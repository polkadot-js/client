// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pInterface, P2pTypes } from '@polkadot/client-p2p/types';
import type { ConfigType } from './cli/types';

const { DevP2p, LibP2p } = require('@polkadot/client-p2p');
const defaults = require('@polkadot/client-p2p/defaults');
const assert = require('@polkadot/util/assert');

const Classes: { [P2pTypes]: Class<P2pInterface> } = {
  'devp2p': DevP2p,
  'libp2p': LibP2p
};

module.exports = function initP2p ({ role, p2p: { address, maxPeers, port, type } }: ConfigType): P2pInterface {
  const Clazz = Classes[type];

  assert(Clazz, `Unable to create unknown p2p type '${type || ''}'`);

  return new ((Clazz: any): Class<LibP2p>)({
    address,
    maxPeers,
    port,
    privateKey: defaults.PRIVATE_KEY,
    role
  });
};
