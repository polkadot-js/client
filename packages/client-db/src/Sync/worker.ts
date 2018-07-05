// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Message } from './types';

import { parentPort } from 'worker_threads';
import Trie from '@polkadot/trie-db';
import isUndefined from '@polkadot/util/is/undefined';

import commands from './commands';

type FnMap = {
  [index: string]: (message: Message) => any
};

// @ts-ignore Oops, we need the params here
const trie = new Trie();

// Sets the state and wakes any Atomics waiting on the current state to change.
// If we are not done, assume that we will have to do something afterwards, so
// enter a wait period.
function notify (state: Int32Array, command: number, doWait: boolean = false): void {
  state[0] = command;

  // FIXME This is going to be renamed '.notify', Node 10.6 warns, 10.5 allows
  Atomics.wake(state, 0, 1);

  if (doWait) {
    Atomics.wait(state, 0, command, 5000);
  }
}

// Waits on a function (returning a promise) to complete. Notify either on end or
// error, discarding the actual result.
async function notifyDone (state: Int32Array, fn: () => Promise<any>): Promise<void> {
  try {
    await fn();
    notify(state, commands.END);
  } catch (error) {
    notify(state, commands.ERROR);
  }
}

// Send the value (caller got it from a function return) back to the parent. Since the result
// may be quite large, we do this is phases -
//   - send the actual size of the result first
//   - loop through the actual result, sending buffer.length bytes per iteration
//   - since most results are smaller, the 4K buffer should capture a lot, but :code is >250K
function returnValue (state: Int32Array, buffer: Uint8Array | undefined, value: Uint8Array | null): void {
  if (isUndefined(buffer)) {
    notify(state, commands.ERROR);
    return;
  }

  const view = new DataView(buffer.buffer);

  if (!value) {
    notify(state, commands.END);
    return;
  }

  const size = value.length;
  let offset = 0;

  view.setUint32(0, size);
  notify(state, commands.SIZE, true);

  while (offset !== size) {
    const available = Math.min(buffer.length, size - offset);

    buffer.set(value.subarray(offset, offset + available), 0);
    offset += available;

    if (offset === size) {
      // we are done, last bytes incoming
      notify(state, commands.END);
    } else {
      // we have more data to come
      notify(state, commands.READ, true);
    }
  }
}

function checkpoint ({ state }: Message): void {
  notifyDone(state, () =>
    trie.checkpoint()
  );
}

function commit ({ state }: Message): void {
  notifyDone(state, () =>
    trie.commit()
  );
}

function del ({ key, state }: Message): void {
  notifyDone(state, () =>
    trie.del(key)
  );
}

async function get ({ buffer, key, state }: Message): Promise<void> {
  let result;

  try {
    result = await trie.get(key);
  } catch (error) {
    notify(state, commands.ERROR);
    return;
  }

  returnValue(state, buffer, result);
}

function put ({ key, state, value }: Message): void {
  notifyDone(state, () =>
    trie.put(key, value)
  );
}

function revert ({ state }: Message): void {
  notifyDone(state, () =>
    trie.revert()
  );
}

function root ({ buffer, state }: Message): void {
  returnValue(state, buffer, trie.root);
}

const functions: FnMap = {
  checkpoint,
  commit,
  del,
  get,
  put,
  revert,
  root
};

parentPort.on('message', (message: Message): void => {
  const fn = functions[message.type];

  if (fn) {
    fn(message);
  } else {
    notify(message.state, commands.ERROR);
  }
});
