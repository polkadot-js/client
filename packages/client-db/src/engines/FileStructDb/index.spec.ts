// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { alexander } from '@polkadot/chainspec';
import TxDb from '@polkadot/db/engines/TransactionDb';
import TrieDb from '@polkadot/trie-db';
import { hexToU8a, u8aToHex } from '@polkadot/util';

import Db from '.';

const KEY_A = new Uint8Array([
  0x10, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_B = new Uint8Array([
  0x20, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_C = new Uint8Array([
  0x10, 2, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_D = new Uint8Array([
  0x10, 2, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_E = new Uint8Array([
  0x10, 2, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_F = new Uint8Array([
  0x50, 2, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const VAL_A = new Uint8Array([0x42, 1, 0x69]);
const VAL_B = new Uint8Array([0x42, 1, 2, 0x69]);
const VAL_C = new Uint8Array([0x42, 1, 2, 3, 0x69]);
const VAL_D = new Uint8Array([0x42, 1, 2, 3, 4, 0x69]);
const VAL_E = new Uint8Array([0x42, 1, 2, 3, 4, 5, 0x69]);
const VAL_F = new Uint8Array([0x42, 1, 2, 3, 4, 5, 6, 0x69]);

// NOTE Skipped, doesn't seem to be too happy on CI (cwd issues?)
describe('FileStructDb', () => {
  describe('basics', () => {
    const location = path.join(process.cwd(), '--test-FileStructDb-basic');
    let store: Db;

    const testGet = (key: Uint8Array, value: Uint8Array) =>
      expect(store.get(key)).toEqual(value);

    beforeAll(() => {
      mkdirp.sync(location);

      store = new Db(location, 'testing', {});
      store.open();
    });

    afterAll(() => {
      store.close();
      rimraf.sync(location);
    });

    it('writes an entry', () => {
      console.error('A: execute');

      store.put(KEY_A, VAL_A);

      console.error('A: expectations');

      testGet(KEY_A, VAL_A);
    });

    it('writes an entry (additional)', () => {
      console.error('B: execute');

      store.put(KEY_B, VAL_B);

      console.error('A: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
    });

    it('writes an entry (expanding the tree)', () => {
      console.error('C: execute');

      store.put(KEY_C, VAL_C);

      console.error('C: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
    });

    it('writes an entry (expanding the tree, again)', () => {
      console.error('D: execute');

      store.put(KEY_F, VAL_F);

      console.error('D: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
      testGet(KEY_F, VAL_F);
    });

    it('writes an entry (expanding the tree, yet again)', () => {
      console.error('E: execute');

      store.put(KEY_E, VAL_E);

      console.error('E: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
      testGet(KEY_E, VAL_E);
      testGet(KEY_F, VAL_F);
    });

    it('writes an entry, expanding the top-level', () => {
      console.error('F: execute');

      store.put(KEY_D, VAL_D);

      console.error('F: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
      testGet(KEY_D, VAL_D);
      testGet(KEY_E, VAL_E);
      testGet(KEY_F, VAL_F);
    });

    it('overrides with smaller values', () => {
      console.error('G: execute');

      store.put(KEY_F, VAL_A);

      console.error('G: expectations');

      testGet(KEY_A, VAL_A);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
      testGet(KEY_D, VAL_D);
      testGet(KEY_E, VAL_E);
      testGet(KEY_F, VAL_A);
    });

    it('overrides with larger values', () => {
      console.error('H: execute');

      store.put(KEY_A, VAL_F);

      console.error('H: expectations');

      testGet(KEY_A, VAL_F);
      testGet(KEY_B, VAL_B);
      testGet(KEY_C, VAL_C);
      testGet(KEY_D, VAL_D);
      testGet(KEY_E, VAL_E);
      testGet(KEY_F, VAL_A);
    });
  });

  describe('trie data', () => {
    const { genesis: { raw } } = alexander;
    const location = path.join(process.cwd(), '--test-FileStructDb-trie-data');
    let store: Db;

    beforeAll(() => {
      mkdirp.sync(location);

      store = new Db(location, 'testing', {});
      store.open();
    });

    afterAll(() => {
      store.close();
      rimraf.sync(location);
    });

    it('stores all the values', () => {
      Object.entries(raw).forEach(([key, val]) => {
        store.put(hexToU8a(key), hexToU8a(val));
      });
    });

    describe('retrieves all the values', () => {
      Object.entries(raw).forEach(([key, val]) => {
        it(key, () => {
          expect(
            u8aToHex(store.get(hexToU8a(key)))
          ).toEqual(val);
        });
      });
    });
  });

  describe('via TrieDb', () => {
    class TestDb extends TxDb {
      constructor (base: string, name: string) {
        super(new Db(base, name, {}));
      }
    }

    const location = path.join(process.cwd(), '--test-FileStructDb-trie-db');
    const { genesis: { raw }, genesisRoot } = alexander;

    beforeAll(() => {
      rimraf.sync(location);
      mkdirp.sync(location);
    });

    it('creates a trie with the correct root', () => {
      console.error('TRIE: insert');

      const trie = new TrieDb(new TestDb(location, 'test.db'));

      trie.open();
      trie.transaction(() => {
        Object.entries(raw).forEach(([key, val]) => {
          trie.put(hexToU8a(key), hexToU8a(val));
        });

        return true;
      });

      expect(
        u8aToHex(trie.getRoot())
      ).toEqual(genesisRoot);
    });

    describe('re-opens and has all the correct keys', () => {
      console.error('TRIE: retrieve');

      const trie = new TrieDb(new TestDb(location, 'test.db'));

      trie.open();
      trie.setRoot(hexToU8a(genesisRoot));

      Object.entries(raw).forEach(([key, val]) => {
        it(key, () => {
          expect(
            u8aToHex(trie.get(hexToU8a(key)))
          ).toEqual(val);
        });
      });
    });
  });
});
