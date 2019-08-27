// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TrieEntry } from '@polkadot/trie-db/types';
import { Hash } from '@polkadot/types/interfaces';
import { Struct, Vec } from '@polkadot/types';

export default class TrieChanges extends Struct {
  private _added: Hash[];
  private _removed: Hash[];
  private _same: Hash[];

  constructor (entry: TrieEntry | null, prev?: TrieChanges) {
    super({
      root: 'Hash',
      children: 'Vec<Hash>'
    }, entry ? { root: entry[0], children: entry[2] } : {});

    const prevDeps = prev ? prev.children : null;
    const currDeps = this.children;

    this._added = prevDeps ? currDeps.filter((hash) => !prevDeps.includes(hash)) : [];
    this._removed = [];
    this._same = [];

    (prevDeps || []).forEach((hash) => {
      if (currDeps.includes(hash)) {
        this._same.push(hash);
      } else {
        this._removed.push(hash);
      }
    });
  }

  get changes (): [Hash[], Hash[], Hash[]] {
    return [this._added, this._removed, this._same];
  }

  get children (): Vec<Hash> {
    return this.get('children') as Vec<Hash>;
  }

  get root (): Hash {
    return this.get('root') as Hash;
  }
}
