// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// HACK Under Node workers not all process functions are exposed
require('./hackEnv');

// FIXME Waiting on native lib support in workers -
//    https://github.com/nodejs/node/issues/21481
//    https://github.com/nodejs/node/issues/21783
// const diskdown = require('leveldown');
// const diskdown = require('rocksdb');
const diskdown = require('@polkadot/db-diskdown').default;

const levelup = require('levelup');
const memdown = require('memdown');
const { parentPort, threadId, workerData } = require('worker_threads');
const Trie = require('@polkadot/trie-db').default;
const encoder = require('@polkadot/trie-db/encoder').default;
const isFunction = require('@polkadot/util/is/function').default;
const logger = require('@polkadot/util/logger').default;

const { notifyOnDone, notifyOnValue } = require('./notify');

const l = logger('sync/worker');
const handlers = {};

function initDb () {
  const downdb = isFunction(diskdown) && workerData.type === 'disk'
    ? diskdown(workerData.path)
    : memdown();

  return workerData.isTrie
    ? new Trie(downdb)
    : levelup(encoder(downdb));
}

function initHandlers () {
  const db = initDb();

  return {
    checkpoint: ({ state }) =>
      notifyOnDone(state, () =>
        db.checkpoint()),
    commit: ({ state }) =>
      notifyOnDone(state, () =>
        db.commit()),
    del: ({ key, state }) =>
      notifyOnDone(state, () =>
        db.del(key)),
    get: ({ buffer, key, state }) =>
      notifyOnValue(state, buffer, () =>
        db.get(key)),
    put: ({ key, state, value }) =>
      notifyOnDone(state, () =>
        db.put(key, value)),
    revert: ({ state }) =>
      notifyOnDone(state, () =>
        db.revert()),
    getRoot: ({ buffer, state }) =>
      notifyOnValue(state, buffer, async () =>
        db.root),
    setRoot: ({ state, value }) =>
      notifyOnDone(state, async () => {
        db.root = value;
      })
  };
}

parentPort.on('message', (message) => {
  try {
    if (!handlers[threadId]) {
      handlers[threadId] = initHandlers();
    }

    const fn = handlers[threadId][message.type];

    if (fn) {
      fn(message);
    } else {
      throw new Error(`Unable to find handler for type=${message.type}`);
    }
  } catch (error) {
    l.error('Sync/worker.js:', error);

    notify(message.state, commands.ERROR);
  }
});
