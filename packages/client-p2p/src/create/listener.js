// ISC, Copyright 2017 Jaco Greeff
// @flow

const PeerInfo = require('peer-info');

const assert = require('@polkadot/util/assert');
const isIp = require('@polkadot/util/is/ip');

const createPeerInfo = require('./peerInfo');
const defaults = require('../defaults');

module.exports = async function createListener (ip: string = defaults.ADDRESS, port: number = defaults.PORT): Promise<PeerInfo> {
  assert(isIp(ip), `Expected an IP address`);

  const type = isIp(ip, 'v4') ? 'ip4' : 'ip6';

  return createPeerInfo([
    `/${type}/${ip}/tcp/${port}`
  ]);
};
