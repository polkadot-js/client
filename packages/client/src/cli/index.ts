// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '../types';

import getArgv from './argv';
import keyToCamel from './keyToCamel';

export default function cli (params?: string): Config {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config, key) => {
      if (/^(db|dev|p2p|rpc|wasm)-/.test(key)) {
        const section = key.substr(0, key.indexOf('-'));
        const name = keyToCamel(key, 1);

        // @ts-ignore ummm... no index, not Map-ing this one
        config[section] = config[section] || {};
        // @ts-ignore ummm... no index, not Map-ing this one
        config[section][name] = argv[key];
      } else if (!/^(db|dev|p2p|rpc|wasm)[A-Z]/.test(key)) {
        const name = keyToCamel(key);

        // @ts-ignore ummm... no index, not Map-ing this one
        config[name] = argv[key];
      }

      return config;
    }, {} as Config);
}
