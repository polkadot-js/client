// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pNodes } from '../types';

const PeerInfo = require('peer-info');

const assert = require('@polkadot/util/assert');
const promisify = require('@polkadot/util/promisify');

module.exports = async function createPeerInfo (addresses: P2pNodes): Promise<PeerInfo> {
  assert(addresses.length, 'Expected at least one network address');

  const peerInfo: PeerInfo = await promisify(null, PeerInfo.create);

  addresses.forEach((address) => {
    peerInfo.multiaddrs.add(address);
  });

  return peerInfo;
};
