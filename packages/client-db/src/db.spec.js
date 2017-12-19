// ISC, Copyright 2017 Jaco Greeff

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
        path: './tmp'
      }
    };
    state = {
      chain: {
        name: 'chainDB'
      }
    };

    db = new DB(config, state, 'test', true);
  });

  it('creates a LevelDown store as required (default)', () => {
    expect(
      isInstanceOf(
        new DB(config, state, 'test')._trie.db._db,
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
