// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import PeerInfo from 'peer-info';

import { assert, isIp, promisify } from '@polkadot/util';

import defaults from '../defaults';

export default async function createListener (ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected a valid IP address`);

  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';
  const peerInfo = await promisify(null, PeerInfo.create);

  peerInfo.multiaddrs.add(`/${type}/${ip}/tcp/${port}/ipfs/${peerInfo.id.toB58String()}`);

  return peerInfo;
}
