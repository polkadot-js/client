// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RpcConfigType } from '@polkadot/client-rpc/types';
import type { ConfigType, ExtP2pConfigType } from './types';

const yargs = require('yargs');

const general = require('./general');
const p2p = require('./p2p');
const rpc = require('./rpc');
const clientId = require('../clientId');

module.exports = function parse (cli?: string): ConfigType {
  const config = yargs
    .version(clientId)
    .options(Object.assign({}, general, p2p, rpc))
    .group(Object.keys(p2p), 'Peer-to-peer')
    .group(Object.keys(rpc), 'RPC server')
    .strict();

  const emptyConfig: $Shape<ConfigType> = {
    p2p: ({}: $Shape<ExtP2pConfigType>),
    rpc: ({}: $Shape<RpcConfigType>)
  };

  const argv = (((
    cli
      ? config.parse(cli).argv
      : config.argv
  ): any): { [string]: any });

  return Object
    .keys(argv)
    .reduce((config: ConfigType, key: string) => {
      if (key.indexOf('-') !== -1) {
        return config;
      }

      if (/^(p2p|rpc)/.test(key)) {
        const section = key.substr(0, 3);
        const name = key.replace(/^(p2p|rpc)/, '');

        config[section][`${name.substr(0, 1).toLowerCase()}${name.substr(1)}`] = argv[key];
      } else {
        config[key] = argv[key];
      }

      return config;
    }, emptyConfig);
};
