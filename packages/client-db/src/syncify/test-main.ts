// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import path from 'path';
import { Worker } from 'worker_threads';
import commands from './commands';

export default function main () {
  const child = new Worker(path.join(__dirname, './test-worker.js'));

  const sendMessage = (type: string): number => {
    const state = new Int32Array(new SharedArrayBuffer(8));

    state[0] = commands.START;
    child.postMessage({
      state,
      type
    });

    Atomics.wait(state, 0, commands.START);

    return state[0];
  };

  return {
    exit: (): void =>
      child.terminate(),
    callTimeout: (): number =>
      sendMessage('timeout'),
    callError: (): number =>
      sendMessage('error')
  };
}
