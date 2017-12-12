// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ConfigType } from './types';

const getArgv = require('./argv');

module.exports = function cli (params?: string): ConfigType {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config: ConfigType, key: string) => {
      if (key.indexOf('-') !== -1) {
        return config;
      }

      if (/^(p2p|rpc)/.test(key)) {
        const section = key.substr(0, 3);
        const name = key.replace(/^(p2p|rpc)/, '');

        config[section] = config[section] || {};
        config[section][`${name.substr(0, 1).toLowerCase()}${name.substr(1)}`] = argv[key];
      } else {
        config[key] = argv[key];
      }

      return config;
    }, ({}: $Shape<ConfigType>));
};
