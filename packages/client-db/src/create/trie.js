// ISC, Copyright 2017 Jaco Greeff
// @flow

const LevelDown = require('leveldown');
const LevelUp = require('levelup');
const MemDown = require('memdown');
const Trie = require('merkle-patricia-tree');

const defaults = require('../defaults');
const createDir = require('./dir');

module.exports = function createTrie (root: string, name: string, inMemory: boolean): Trie {
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
