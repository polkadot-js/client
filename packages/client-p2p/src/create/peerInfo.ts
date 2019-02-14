// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pNodes } from '../types';

import PeerInfo from 'peer-info';

import { assert, promisify } from '@polkadot/util';

export default async function createPeerInfo (addresses: P2pNodes): Promise<PeerInfo> {
  assert(addresses.length, 'Expected at least one network address');

  const peerInfo: PeerInfo = await promisify(null, PeerInfo.create);

  addresses.forEach((address) =>
    peerInfo.multiaddrs.add(address)
  );

  return peerInfo;
}
