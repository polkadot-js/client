// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isIp = require('@polkadot/util/is/ip');
const isNumber = require('@polkadot/util/is/number');
const promisify = require('@polkadot/util/promisify');
const PeerInfo = require('peer-info');

const defaults = require('../defaults');

module.exports = async function createPeer (ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected a valid IP address, received '${ip}'`);

  assert(isNumber(port), `Expected a valid numeric port, received '${port}'`);

  const peerInfo: PeerInfo = await promisify(PeerInfo.create);
  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';

  peerInfo.multiaddrs.add(`/${type}/${ip}/tcp/${port}`);
  peerInfo.multiaddrs.add(`/${type}/${ip}/udp/${port}`);

  return peerInfo;
};
