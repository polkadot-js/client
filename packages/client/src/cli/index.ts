// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config, ConfigKeys } from '../types';

import getArgv from './argv';
import keyToCamel from './keyToCamel';

export default function cli (params?: string): Config {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config, key) => {
      if (/^(db|dev|p2p|rpc|telemetry|wasm)-/.test(key)) {
        const section = key.substr(0, key.indexOf('-')) as ConfigKeys;
        const name = keyToCamel(key, 1);

        config[section] = config[section] || {};
        // @ts-ignore ummm... no index, not Map-ing this one
        config[section][name] = argv[key];
      } else if (!/^(db|dev|p2p|rpc|telemetry|wasm)[A-Z]/.test(key)) {
        const name = keyToCamel(key) as ConfigKeys;

        // @ts-ignore ummm... no index, not Map-ing this one
        config[name] = argv[key];
      }

      return config;
    }, {} as Config);
}
