// ISC, Copyright 2017 Jaco Greeff
// @flow

const LevelDown = require('leveldown');
const LevelUp = require('levelup');
const MemDown = require('memdown');
const Trie = require('merkle-patricia-tree');

const assert = require('@polkadot/util/assert');
const isBoolean = require('@polkadot/util/is/boolean');
const isString = require('@polkadot/util/is/string');

const defaults = require('../defaults');
const createDir = require('./dir');

module.exports = function createTrie (root: string, name: string, inMemory: boolean): Trie {
  assert(isString(root), 'Expected database root');
  assert(isString(name), 'Expected database name');
  assert(isBoolean(inMemory), 'Expected memory flag');

  return new Trie(
    new LevelUp(
      inMemory
        ? new MemDown()
        : new LevelDown(
          createDir(root, defaults.PREFIX_DB, name)
        )
    )
  );
};
