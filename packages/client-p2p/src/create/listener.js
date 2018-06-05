// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const PeerInfo = require('peer-info');

const assert = require('@polkadot/util/assert');
const promisify = require('@polkadot/util/promisify');
const isIp = require('@polkadot/util/is/ip');

const defaults = require('../defaults');

module.exports = async function createListener (ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected an IP address`);

  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';
  const peerInfo = await promisify(null, PeerInfo.create);

  peerInfo.multiaddrs.add(`/${type}/${ip}/tcp/${port}/ipfs/${peerInfo.id.toB58String()}`);

  return peerInfo;
};
