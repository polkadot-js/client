// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const PeerInfo = require('peer-info');

const assert = require('@polkadot/util/assert');
const promisify = require('@polkadot/util/promisify');

module.exports = async function createPeerInfo (addresses: ChainConfigType$Nodes): Promise<PeerInfo> {
  assert(Array.isArray(addresses), 'Expected an array of network addresses');
  assert(addresses.length, 'Expected at least one network address');

  const peerInfo: PeerInfo = await promisify(null, PeerInfo.create);

  addresses.forEach((address) => {
    peerInfo.multiaddrs.add(address);
  });

  return peerInfo;
};
