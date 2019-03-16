// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType } from '../types';

import PeerInfo from 'peer-info';

import { assert, isIp, promisify } from '@polkadot/util';

import defaults from '../defaults';

type Config = {
  address: string,
  discoverStar: boolean,
  port: number
};

export default async function createListener (envType: EnvType, { address, discoverStar, port }: Config): Promise<PeerInfo> {
  assert(isIp(address), `Expected a valid IP address`);

  const peerInfo = await promisify(null, PeerInfo.create);
  const peerIdStr = peerInfo.id.toB58String();
  const isCli = envType !== 'browser';

  if (isCli) {
    const type = isIp(address, 'v4') ? 'ip4' : 'ip6';

    peerInfo.multiaddrs.add(`/${type}/${address}/tcp/${port}/p2p/${peerIdStr}`);
  }

  if (discoverStar) {
    defaults.SIGNALLING.forEach((addr) =>
      peerInfo.multiaddrs.add(`${addr}/${peerIdStr}`)
    );
  }

  return peerInfo;
}
