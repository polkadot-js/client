// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Client from '@polkadot/client';

import config from './config';

const ctx: Worker = self as any;
let client: Client;

// const ClientWorker = require('worker-loader?name=[name].[hash:8].js!./worker');

// function initWorker () {
//   const worker = new ClientWorker();

//   worker.onmessage = (event: MessageEvent) => {
//     // handle
//   };

//   worker.postMessage('create');
// }

function initClient () {
  client = new Client();
  client.start(config).catch((error) => {
    console.error('Failed to start client', error);
  });
}

ctx.onmessage = async () => {
  if (!client) {
    initClient();
  }
};
