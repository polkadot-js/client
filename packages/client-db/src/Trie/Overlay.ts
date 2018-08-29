// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb, TransactionTrieDb } from '../types';

import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Base from './Base';

const l = logger('db/overlay');

export default class OverlayDb extends Base implements TransactionTrieDb {
  constructor (wrapped: TrieDb) {
    super(wrapped);
  }

  checkpoint () {
    this.wrapped.checkpoint();

    l.debug(() => ['checkpoint at', u8aToHex(this.getRoot())]);
  }

  commit () {
    this.wrapped.commit();
    this.clearCache(false);

    l.debug(() => ['committed at', u8aToHex(this.getRoot())]);
  }

  revert () {
    this.wrapped.revert();
    this.clearCache(true);

    l.debug(() => ['reverted to', u8aToHex(this.getRoot())]);
  }

  transaction <T> (executor: () => T): T {
    try {
      this.checkpoint();

      const result = executor();

      this.commit();

      return result;

    } catch (error) {
      this.revert();

      throw error;
    }
  }

  getRoot (): Uint8Array {
    return this.wrapped.getRoot();
  }

  setRoot (value: Uint8Array): void {
    this.clearCache(true);

    return this.wrapped.setRoot(value);
  }
}
