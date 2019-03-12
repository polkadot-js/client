// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config, ConfigKeys } from '@polkadot/client/types';

import Client from '@polkadot/client/index';
import { logger } from '@polkadot/util';

import getArgv from './argv';
import keyToCamel from './keyToCamel';

const l = logger('client/cli');

function cli (params?: string): Config {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config, key) => {
      if (/^(db|dev|p2p|rpc|telemetry|wasm)-/.test(key)) {
        const section = key.substr(0, key.indexOf('-')) as ConfigKeys;
        const name = keyToCamel(key, 1);

        (config as any)[section] = config[section] || {};
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

// FIXME Catch the uncaught errors that weren't wrapped in a domain or try catch statement
// This was added due to exceptions from p2p streams, for which no pass-through handler exists
// and none can be added. As it stands, not a bad idea since it shows where stuff breaks
// instead of just exiting, however we should _never_ have these - and we have a couple that
// puts the app into an unknown state
// process.on('uncaughtException', (err: Error) => {
//   l.error('Uncaught exception', err);
// });

const client = new Client();

client.start(cli()).catch((error) => {
  l.error('Failed to start client', error);

  process.exit(-1);
});

process.on('SIGINT', async () => {
  l.log('Caught interrupt signal, shutting down');

  await client.stop();

  process.exit(0);
});
