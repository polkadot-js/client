// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const promisify = require('@polkadot/util/promisify');
const PeerInfo = require('peer-info');

module.exports = async function createPeerInfo (addresses: ChainConfigType$Nodes): Promise<PeerInfo> {
  assert(Array.isArray(addresses), 'Expected an array of peers');

  const peerInfo: PeerInfo = await promisify(PeerInfo.create);

  addresses.forEach((address) => {
    peerInfo.multiaddrs.add(address);
  });

  return peerInfo;
};
