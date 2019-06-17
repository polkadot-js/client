// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TrieEntry } from '@polkadot/trie-db/types';
import { Hash, Struct, Vector } from '@polkadot/types';

export default class TrieChanges extends Struct {
  private _added: Array<Hash>;
  private _removed: Array<Hash>;
  private _same: Array<Hash>;

  constructor (entry: TrieEntry | null, prev?: TrieChanges) {
    super({
      root: Hash,
      children: Vector.with(Hash)
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

  get changes (): [Array<Hash>, Array<Hash>, Array<Hash>] {
    return [this._added, this._removed, this._same];
  }

  get children (): Vector<Hash> {
    return this.get('children') as Vector<Hash>;
  }

  get root (): Hash {
    return this.get('root') as Hash;
  }
}
