// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const assert = require('@polkadot/util/assert');
const promisify = require('@polkadot/util/promisify');
const PeerInfo = require('peer-info');

module.exports = async function createPeerInfo (addresses: ChainConfigType$Nodes): Promise<PeerInfo> {
  assert(Array.isArray(addresses), 'Expected an array of addresses');

  const peerInfo: PeerInfo = await promisify(null, PeerInfo.create);

  addresses.forEach((address) => {
    peerInfo.multiaddrs.add(address);
  });

  return peerInfo;
};
