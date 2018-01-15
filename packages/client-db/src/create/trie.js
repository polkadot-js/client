// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const LevelDown = require('leveldown');
const LevelUp = require('levelup');
const MemDown = require('memdown');
const Trie = require('merkle-patricia-tree');

const defaults = require('../defaults');
const createDir = require('./dir');

module.exports = function createTrie (root: string, chainName: string, dbType: string, inMemory: boolean): Trie {
  return new Trie(
    new LevelUp(
      inMemory
        ? new MemDown()
        : new LevelDown(
          createDir(root, defaults.PREFIX_DB, `${chainName}/${dbType}`)
        )
    )
  );
};
