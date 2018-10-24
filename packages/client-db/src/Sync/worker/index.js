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
const { isFunction, logger } = require('@polkadot/util');

const { notify, notifyOnDone, notifyOnValue, notifyPong } = require('./atomics');
const commands = require('./commands');

const l = logger('sync/worker');
const handlers = {};

function initDb (port) {
  const isDiskdown = isFunction(diskdown) && workerData.type === 'disk';
  const down = isDiskdown
    ? diskdown(workerData.path)
    : memdown();

  if (isDiskdown && workerData.withCompact) {
    down.compact((progress) =>
      port.postMessage({ progress })
    );
  }

  port.postMessage({ isCompleted: true });
  port.close();

  return workerData.isTrie
    ? new Trie(down)
    : levelup(encoder(down));
}

function initHandlers (port) {
  const db = initDb(port);

  return {
    checkpoint: ({ state }) =>
      notifyOnDone(state, () => db.checkpoint()),
    commit: ({ state }) =>
      notifyOnDone(state, () => db.commit()),
    del: ({ key, state }) =>
      notifyOnDone(state, () => db.del(key)),
    get: ({ buffer, key, state }) =>
      notifyOnValue(state, buffer, () => db.get(key)),
    put: ({ key, state, value }) =>
      notifyOnDone(state, () => db.put(key, value)),
    revert: ({ state }) =>
      notifyOnDone(state, () => db.revert()),
    getRoot: ({ buffer, state }) =>
      notifyOnValue(state, buffer, async () => db.root),
    hasRoot: ({ buffer, key, state }) =>
      notifyOnNumber(state, buffer, () => db.checkRoot(key) ? 1 : 0),
    setRoot: ({ key, state }) =>
      notifyOnDone(state, async () => {
        db.root = key;
      })
  };
}

parentPort.on('message', (message) => {
  try {
    if (message.type === '__init') {
      handlers[threadId] = initHandlers(message.port);
      return;
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
