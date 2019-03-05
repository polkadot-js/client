// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType } from '../types';

import PeerInfo from 'peer-info';

import { assert, isIp, promisify } from '@polkadot/util';

import defaults from '../defaults';

export default async function createListener (ip: string = defaults.ADDRESS, port: number = defaults.PORT, envType: EnvType = 'nodejs'): Promise<PeerInfo> {
  assert(isIp(ip), `Expected a valid IP address`);

  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';
  const peerInfo = await promisify(null, PeerInfo.create);
  const peerIdStr = peerInfo.id.toB58String();

  peerInfo.multiaddrs.add(
    envType === 'browser'
      ? `/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star/p2p/${peerIdStr}`
      : `/${type}/${ip}/tcp/${port}/p2p/${peerIdStr}`
    );

  return peerInfo;
}
