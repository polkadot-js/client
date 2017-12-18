// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ConfigType } from '@polkadot/client-state/types';

const getArgv = require('./argv');

function keyToCamel (key: string, startIndex: number = 0): string {
  return key.split('-').reduce((name, part, index) => {
    if (index <= startIndex) {
      return part;
    }

    return `${name}${part.substr(0, 1).toUpperCase()}${part.substr(1).toLowerCase()}`;
  }, '');
}

module.exports = function cli (params?: string): ConfigType {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config: ConfigType, key: string) => {
      const sepIndex = key.indexOf('-');

      if (/^(db|p2p|rpc)-/.test(key)) {
        const section = key.substr(0, sepIndex);
        const name = keyToCamel(key, 1);

        config[section] = config[section] || {};
        config[section][name] = argv[key];
      } else if (!/^(db|p2p|rpc)[A-Z]/.test(key)) {
        const name = keyToCamel(key);

        config[name] = argv[key];
      }

      return config;
    }, ({}: $Shape<ConfigType>));
};
