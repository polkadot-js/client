// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';

import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Base from './Base';

const l = logger('db/overlay');

export default class OverlayDb extends Base implements TrieDb {
  constructor (wrapped: TrieDb) {
    super(wrapped);
  }

  checkpoint () {
    l.debug(() => ['checkpoint at', u8aToHex(this.getRoot())]);

    this.wrapped.checkpoint();
  }

  commit () {
    this.clearCache();
    this.wrapped.commit();

    l.debug(() => ['committed at', u8aToHex(this.getRoot())]);
  }

  revert () {
    this.clearCache();
    this.wrapped.revert();

    l.debug(() => ['reverted to', u8aToHex(this.getRoot())]);
  }

  getRoot (): Uint8Array {
    return this.wrapped.getRoot();
  }

  setRoot (value: Uint8Array): void {
    return this.wrapped.setRoot(value);
  }
}
