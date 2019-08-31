// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType } from '../types';

import PeerInfo from 'peer-info';

import { assert, isIp, promisify } from '@polkadot/util';

import defaults from '../defaults';

interface Config {
  address: string;
  discoverStar: boolean;
  externalIp?: string | null;
  port: number;
}

function constructMa (address: string, port: number, peerIdStr: string): string {
  const type = isIp(address, 'v4') ? 'ip4' : 'ip6';

  return `/${type}/${address}/tcp/${port}/p2p/${peerIdStr}`;
}

export default async function createListener (envType: EnvType, { address, discoverStar, port }: Config): Promise<PeerInfo> {
  assert(isIp(address), 'Expected a valid IP address');

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const peerInfo = await promisify(null, PeerInfo.create);
  const peerIdStr = peerInfo.id.toB58String();
  const isCli = envType !== 'browser';

  if (isCli) {
    peerInfo.multiaddrs.add(constructMa(address, port, peerIdStr));

    // if (externalIp) {
    //   peerInfo.multiaddrs.add(constructMa(externalIp, port, peerIdStr));
    // }
  }

  if (discoverStar) {
    defaults.SIGNALLING.forEach((addr): void =>
      peerInfo.multiaddrs.add(`${addr}/${peerIdStr}`)
    );
  }

  return peerInfo;
}
