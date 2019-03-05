// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType } from '../types';

import PeerInfo from 'peer-info';

import { assert, isIp, promisify } from '@polkadot/util';

import defaults from '../defaults';

export default async function createListener (envType: EnvType, ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected a valid IP address`);

  const peerInfo = await promisify(null, PeerInfo.create);
  const peerIdStr = peerInfo.id.toB58String();
  const isCli = envType !== 'browser';

  if (isCli) {
    const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';

    peerInfo.multiaddrs.add(`/${type}/${ip}/tcp/${port}/p2p/${peerIdStr}`);
  }

  if (defaults.RTC_SIGNAL_BASE) {
    peerInfo.multiaddrs.add(`${defaults.RTC_SIGNAL_BASE}/${peerIdStr}`);
  }

  if (defaults.WSS_SIGNAL_BASE) {
    peerInfo.multiaddrs.add(`${defaults.WSS_SIGNAL_BASE}/${peerIdStr}`);
  }

  return peerInfo;
}
