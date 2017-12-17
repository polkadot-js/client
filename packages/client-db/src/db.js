// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Trie from 'merkle-patricia-tree';
import type { DbConfigType } from './types';

const assert = require('@polkadot/util/assert');
const isBuffer = require('@polkadot/util/is/buffer');
const isString = require('@polkadot/util/is/string');
const promisify = require('@polkadot/util/promisify');

const createTrie = require('./create/trie');
const defaults = require('./defaults');

module.exports = class DB {
  _path: string;
  _trie: Trie;

  constructor ({ path = defaults.PATH }: DbConfigType, name: string, inMemory: boolean = false) {
    this._path = path;
    this._trie = createTrie(path, name, inMemory);
  }

  get path (): string {
    return this._path;
  }

  async del (key: string): Promise<boolean> {
    assert(isString(key), 'Expected string key');

    await promisify(this._trie, this._trie.del, key);

    return true;
  }

  async get (key: string): Promise<Buffer> {
    assert(isString(key), 'Expected string key');

    const value = await promisify(this._trie, this._trie.get, key);

    return value;
  }

  async put (key: string, value: Buffer | string): Promise<Buffer | string> {
    assert(isString(key), 'Expected string key');
    assert(isBuffer(value) || isString(value), 'Expected value');

    await promisify(this._trie, this._trie.put, key, value);

    return value;
  }
};
