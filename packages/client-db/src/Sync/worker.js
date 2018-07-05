// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { Message } from './types';

// import { parentPort } from 'worker_threads';
const { parentPort } = require('worker_threads');

// import Trie from '@polkadot/trie-db';
const Trie = require('@polkadot/trie-db').default;

// import commands from './commands';
// Dangit, also doesn't reolve .ts here... erk :(
// const commands = require('./commands').default;
const commands = {
  START: 0x00,
  SIZE: 0x01,
  FILL: 0x02,
  READ: 0x03,
  END: 0x0f,
  ERROR: 0xff
};

const trie = new Trie();

// Sets the state and wakes any Atomics waiting on the current state to change.
// If we are not done, assume that we will have to do something afterwards, so
// enter a wait period.
// function notify (state: Int32Array, command: number, doWait: boolean = false): void {
function notify (state, command, doWait = false) {
  state[0] = command;

  // FIXME This is going to be renamed '.notify', not in Node (yet)
  Atomics.wake(state, 0, 1);

  if (doWait) {
    Atomics.wait(state, 0, command);
  }
}

// Waits on a function (returning a promise) to complete. Notify either on end or
// error, discarding the actual result.
// function notifyDone (state: Int32Array, fn: () => Promise<any>): Promise<void> {
async function notifyDone (state, fn) {
  try {
    await fn();
    notify(state, commands.END);
  } catch (error) {
    notify(state, commands.ERROR);
  }
}

// Send the value (caller got it from a function return) back to the parent. Since the result
// may be quite large, we do this is phases -
//   - send the actual size of the result first (or U32_MAX if null)
//   - loop through the actual result, sending buffer.length bytes per iteration
//   - since most results are smaller, the 4K buffer should capture a lot, but :code is >250K
// function returnValue (state: Int32Array, buffer: Uint8Array, value: Uint8Array | null): void
function returnValue (state, buffer, value) {
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

    notify(state, commands.READ, true);
  }

  notify(state, commands.END);
}

// function checkpoint (state: Int32Array): void
function checkpoint (state) {
  notifyDone(state, () =>
    trie.checkpoint()
  );
}

// function commit (state: Int32Array): void
function commit (state) {
  notifyDone(state, () =>
    trie.commit()
  );
}

// function del (state: Int32Array, buffer: Uint8Array, key: Uint8Array): void
function del (state, buffer, key) {
  notifyDone(state, () =>
    trie.del(key)
  );
}

// function get (state: Int32Array, buffer: Uint8Array, key: Uint8Array): void
async function get (state, buffer, key) {
  let result;

  try {
    result = await trie.get(key);
  } catch (error) {
    notify(state, commands.ERROR);
    return;
  }

  returnValue(state, buffer, result);
}

// function put (state: Int32Array, buffer: Uint8Array, key: Uint8Array, value: Uint8Array): void
async function put (state, buffer, key, value) {
  notifyDone(state, () =>
    trie.put(key, value)
  );
}

// function revert (state: Int32Array): void
async function revert (state) {
  notifyDone(state, () =>
    trie.revert()
  );
}

// function root (state: Int32Array, buffer: Uint8Array): void
function root (state, buffer) {
  returnValue(state, buffer, trie.root);
}

const functions = [
  checkpoint, commit, del, get, put, revert, root
].reduce((fns, fn) => {
  fns[fn.name] = fn;

  return fns;
}, {});

// parentPort.on('message', ({ state, type }: Message) => {
parentPort.on('message', ({ buffer, key, state, type, value }) => {
  const fn = functions[type];

  if (fn) {
    fn(state, buffer, key, value);
  } else {
    notify(state, commands.ERROR);
  }
});
