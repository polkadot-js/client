// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { Message } from '../types';
// import { FnMap } from './types;

const leveldown = require('leveldown');
const memdown = require('memdown');
// import { parentPort } from 'worker_threads';
const worker = require('worker_threads');
// import Trie from '@polkadot/trie-db';
const Trie = require('@polkadot/trie-db').default;

const { notifyOnDone, notifyOnValue } = require('./notify');

// @ts-ignore Oops, we need the params here
const trie = new Trie(
  worker.workerData.type === 'disk'
    ? leveldown(worker.workerData.path)
    : memdown()
);

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
  // getRoot ({ buffer, state }: Message) =>
  getRoot: ({ buffer, state }) =>
    notifyOnValue(state, buffer, async () =>
      trie.root
    ),
  // setRoot: ({ state, value }: Message) =>
  setRoot: ({ state, value }) =>
    notifyOnDone(state, async () => {
      trie.root = value;
    })

};

// worker.parentPort.on('message', (message: Message): void => {
  worker.parentPort.on('message', (message) => {
  const fn = functions[message.type];

  if (fn) {
    fn(message);
  } else {
    notify(message.state, commands.ERROR);
  }
});
