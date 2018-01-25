// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const LevelDown = require('leveldown');

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const DB = require('./db');

describe('DB', () => {
  let db;
  let config;
  let state;

  beforeEach(() => {
    config = {
      db: {
        path: './tmp',
        type: 'memory'
      }
    };
    state = {
      chain: {
        name: 'chainDB'
      }
    };

    db = new DB(config, state, 'test');
  });

  it('creates a LevelDown store as required (default)', () => {
    expect(
      isInstanceOf(
        new DB(Object.assign({}, config, { db: { path: './tmp' } }), state, 'test')._trie.db._db,
        LevelDown
      )
    ).toEqual(true);
  });

  describe('put', () => {
    it('sets the value', () => {
      return db.put('test', '123').then((result) => {
        expect(result).toEqual('123');
      });
    });
  });

  describe('get', () => {
    it('gets the value set', () => {
      return db.put('test', '456').then(() => {
        return db.get('test').then((value) => {
          expect(value).toEqual(Buffer.from('456'));
        });
      });
    });

    it('gets null value when not set', () => {
      return db.get('testNonExistent').then((value) => {
        expect(value).toEqual(null);
      });
    });
  });

  describe('del', () => {
    it('removes a key set', () => {
      return db.put('test', '789').then(() => {
        return db.del('test').then((result) => {
          expect(result).toEqual(true);

          return db.get('test').then((value) => {
            expect(value).toEqual(null);
          });
        });
      });
    });
  });
});
