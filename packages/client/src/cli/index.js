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

      if (/^(db|p2p|rpc)-/.test(key)) {
        const section = key.substr(0, sepIndex);
        const name = key.split('-').reduce((name, part, index) => {
          if (index <= 1) {
            return part;
          }

          return `${name}${part.substr(0, 1).toUpperCase()}${part.substr(1).toLowerCase()}`;
        }, '');

        config[section] = config[section] || {};
        config[section][name] = argv[key];
      } else if (!/^(p2p|rpc)[A-Z]/.test(key)) {
        config[key] = argv[key];
      }

      return config;
    }, ({}: $Shape<ConfigType>));
};
