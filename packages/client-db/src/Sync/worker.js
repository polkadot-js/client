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

const U32_MAX = 4294967295;

const trie = new Trie();

// function notify (state: Int32Array, command: number): void {
function notify (state, command) {
  state[0] = command;
  Atomics.wake(state, 0, +Infinity);
}

function wait (state, command) {
  Atomics.wait(state, 0, command);
}

async function notifyResult (state, fn) {
  try {
    await fn();
    notify(state, commands.END);
  } catch (error) {
    notify(state, commands.ERROR);
  }
}

function returnValue (state, buffer, value) {
  const view = new DataView(buffer.buffer);

  if (!value) {
    view.setUint32(0, U32_MAX);
    notify(state, commands.SIZE);
    return;
  }

  const size = value.length;
  let offset = 0;

  view.setUint32(0, size);
  notify(state, commands.SIZE);
  wait(state, commands.SIZE);

  while (offset !== size) {
    const available = Math.min(buffer.length, size - offset);

    buffer.set(value.subarray(offset, offset + available), 0);
    offset += available;

    notify(state, commands.READ);
    wait(state, commands.READ);
  }

  notify(state, commands.END);
}

function checkpoint (state) {
  notifyResult(state, () =>
    trie.checkpoint()
  );
}

function commit (state) {
  notifyResult(state, () =>
    trie.commit()
  );
}

function del (state, buffer, key) {
  notifyResult(state, () =>
    trie.del(key)
  );
}

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

async function put (state, buffer, key, value) {
  notifyResult(state, () =>
    trie.put(key, value)
  );
}

async function revert (state) {
  notifyResult(state, () =>
    trie.revert()
  );
}

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
