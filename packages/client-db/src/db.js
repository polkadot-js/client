// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type Trie from 'merkle-patricia-tree';
import type { ConfigType } from '@polkadot/client/types';
import type { StateInterface } from '@polkadot/client-state/types';
import type { DbConfigType, DbInterface } from './types';

const promisify = require('@polkadot/util/promisify');

const createTrie = require('./create/trie');

module.exports = class DB implements DbInterface {
  _config: DbConfigType;
  _trie: Trie;

  // TODO: allowed values for dbType as soon as subclassed
  constructor (config: ConfigType, state: StateInterface, dbType: string, inMemory: boolean = false) {
    this._config = config.db;
    this._trie = createTrie(config.db.path, state.chain.name, dbType, inMemory);
  }

  async del (key: string): Promise<boolean> {
    await promisify(this._trie, this._trie.del, key);

    return true;
  }

  async get (key: string): Promise<Buffer> {
    const value = await promisify(this._trie, this._trie.get, key);

    return value;
  }

  async put (key: string, value: Buffer | string): Promise<Buffer | string> {
    await promisify(this._trie, this._trie.put, key, value);

    return value;
  }
};
