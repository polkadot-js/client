// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { Message } from './types';

// import { parentPort } from 'worker_threads';
const { parentPort } = require('worker_threads');
// import Trie from '@polkadot/trie-db';
const Trie = require('@polkadot/trie-db').default;
// import isUndefined from '@polkadot/util/is/undefined';
const isUndefined = require('@polkadot/util/is/undefined').default;

// import commands from './commands';
const commands = {
  START: 0x00,
  SIZE: 0x01,
  FILL: 0x02,
  READ: 0x03,
  END: 0x0f,
  ERROR: 0xff
};

const WAIT_TIMEOUT = 5000;

// type FnMap = {
//   [index: string]: (message: Message) => any
// };

// @ts-ignore Oops, we need the params here
const trie = new Trie();

// Sets the state and wakes any Atomics waiting on the current state to change.
// If we are not done, assume that we will have to do something afterwards, so
// enter a wait period.
// function notify (state: Int32Array, command: number, doWait: boolean = false): void {
function notify (state, command, doWait = false) {
  state[0] = command;

  Atomics.notify(state, 0, 1);

  if (doWait) {
    Atomics.wait(state, 0, command, WAIT_TIMEOUT);
  }
}

// Waits on a function (returning a promise) to complete. Notify either on end or
// error, discarding the actual result.
// async function notifyOnDone (state: Int32Array, fn: () => Promise<any>): Promise<void> {
async function notifyOnDone (state, fn) {
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
// async function notifyOnValue (state: Int32Array, buffer: Uint8Array | undefined, fn: () => Promise<Uint8Array | null>): Promise<void> {
async function notifyOnValue (state, buffer, fn) {
  if (isUndefined(buffer)) {
    notify(state, commands.ERROR);
    return;
  }

  const view = new DataView(buffer.buffer);
  let value; // : Uint8Array | null = null;

  try {
    value = await fn();
  } catch (error) {
    return notify(state, commands.ERROR);
  }

  if (!value) {
    return notify(state, commands.END);
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

// const functions: FnMap = {
const functions = {
  // checkpoint: ({ state }: Message) =>
  checkpoint: ({ state }) =>
    notifyOnDone(state, () =>
      trie.checkpoint()
    ),
  // commit: ({ state }: Message) =>
  commit: ({ state }) =>
    notifyOnDone(state, () =>
      trie.commit()
    ),
  // commit: ({ state }: Message) =>
  del: ({ key, state }) =>
    notifyOnDone(state, () =>
      trie.del(key)
    ),
  // get: async ({ buffer, key, state }: Message) =>
  get: async ({ buffer, key, state }) =>
    notifyOnValue(state, buffer, () =>
      trie.get(key)
    ),
  // put: ({ key, state, value }: Message) =>
  put: ({ key, state, value }) =>
    notifyOnDone(state, () =>
      trie.put(key, value)
    ),
  // revert: ({ state }: Message) =>
  revert: ({ state }) =>
    notifyOnDone(state, () =>
      trie.revert()
    ),
  // root ({ buffer, state }: Message) =>
  root: ({ buffer, state }) =>
    notifyOnValue(state, buffer, async () =>
      trie.root
    )
};

// parentPort.on('message', (message: Message): void => {
parentPort.on('message', (message) => {
  const fn = functions[message.type];

  if (fn) {
    fn(message);
  } else {
    notify(message.state, commands.ERROR);
  }
});
