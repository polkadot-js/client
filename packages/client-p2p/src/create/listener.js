// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import PeerInfo from 'peer-info';

import assert from '@polkadot/util/assert';
import promisify from '@polkadot/util/promisify';
import isIp from '@polkadot/util/is/ip';

import defaults from '../defaults';

export default async function createListener (ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected an IP address`);

  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';
  const peerInfo = await promisify(null, PeerInfo.create);

  peerInfo.multiaddrs.add(`/${type}/${ip}/tcp/${port}/ipfs/${peerInfo.id.toB58String()}`);

  return peerInfo;
}
