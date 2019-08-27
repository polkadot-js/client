// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ConfigPartial } from '@polkadot/client/types';

import Client from '@polkadot/client';

const ctx: Worker = self as any;
let client: Client;

// const worker = new ClientWorker();

// worker.onmessage = ({ data: { data, type } }: MessageEvent) => {
//   switch (type) {
//     case 'console':
//       this.onConsole(data);
//       break;

//     case 'imported':
//     case 'informant':
//       this.onInformant(data);
//       break;

//     default:
//       break;
//   }
// };

// worker.postMessage({
//   data: config,
//   type: 'create'
// });

function consoleHook (type: 'error' | 'log' | 'warn'): (...args: string[]) => void {
  return (...args: string[]): void => {
    ctx.postMessage({
      data: {
        type,
        text: args.join(' ')
      },
      type: 'console'
    });
  };
}

function initClient (config: ConfigPartial): void {
  console.error = consoleHook('error');
  console.log = consoleHook('log');
  console.warn = consoleHook('warn');

  client = new Client();
  client.start(config).catch((error): void => {
    console.error('Failed to start client', error);
  });

  client.on('imported', (data): void => {
    ctx.postMessage({
      type: 'imported',
      data
    });
  });

  client.on('informant', (data): void => {
    ctx.postMessage({
      type: 'informant',
      data
    });
  });
}

ctx.onmessage = async ({ data: { data, type } }): Promise<void> => {
  if (type === 'create') {
    initClient(data);
  }
};
