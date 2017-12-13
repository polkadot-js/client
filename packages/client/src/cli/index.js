// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ConfigType } from './types';

const getArgv = require('./argv');

module.exports = function cli (params?: string): ConfigType {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config: ConfigType, key: string) => {
      const sepIndex = key.indexOf('-');

      if (/^(p2p|rpc)-/.test(key)) {
        const section = key.substr(0, sepIndex);
        const name = key.replace(/^(p2p|rpc)-/, '');

        config[section] = config[section] || {};
        config[section][name] = argv[key];
      } else if (!/^(p2p|rpc)[A-Z]/.test(key)) {
        config[key] = argv[key];
      }

      return config;
    }, ({}: $Shape<ConfigType>));
};
