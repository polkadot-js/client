// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { Message } from '../types';
// import { FnMap } from './types;

// const leveldown = require('leveldown');
const levelup = require('levelup');
const memdown = require('memdown');
// const rocksdb = require('rocksdb');
const { parentPort, threadId, workerData } = require('worker_threads');
const Trie = require('@polkadot/trie-db').default;
const encoder = require('@polkadot/trie-db/encoder').default;

const { notifyOnDone, notifyOnValue } = require('./notify');

const handlers = {};

function initDb () {
  const downdb = workerData.type === 'disk'
    ? rocksdb(workerData.path)
    : memdown();

  return workerData.isTrie
    ? new Trie(downdb)
    : levelup(encoder(downdb));
}

function initHandlers () {
  const db = initDb();

  return {
    // checkpoint: ({ state }: Message) =>
    checkpoint: ({ state }) =>
      notifyOnDone(state, () =>
        db.checkpoint()
      ),
    // commit: ({ state }: Message) =>
    commit: ({ state }) =>
      notifyOnDone(state, () =>
        db.commit()
      ),
    // commit: ({ state }: Message) =>
    del: ({ key, state }) =>
      notifyOnDone(state, () =>
        db.del(key)
      ),
    // get: ({ buffer, key, state }: Message) =>
    get: ({ buffer, key, state }) =>
      notifyOnValue(state, buffer, () =>
        db.get(key)
      ),
    // put: ({ key, state, value }: Message) =>
    put: ({ key, state, value }) =>
      notifyOnDone(state, () =>
        db.put(key, value)
      ),
    // revert: ({ state }: Message) =>
    revert: ({ state }) =>
      notifyOnDone(state, () =>
        db.revert()
      ),
    // getRoot ({ buffer, state }: Message) =>
    getRoot: ({ buffer, state }) =>
      notifyOnValue(state, buffer, async () =>
        db.root
      ),
    // setRoot: ({ state, value }: Message) =>
    setRoot: ({ state, value }) =>
      notifyOnDone(state, async () => {
        db.root = value;
      })
  };
}

// parentPort.on('message', (message: Message): void => {
parentPort.on('message', (message) => {
  if (!handlers[threadId]) {
    handlers[threadId] = initHandlers();
  }

  const fn = handlers[threadId][message.type];

  if (fn) {
    fn(message);
  } else {
    notify(message.state, commands.ERROR);
  }
});
