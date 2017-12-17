// ISC, Copyright 2017 Jaco Greeff

const DB = require('./db');
const defaults = require('./defaults');

describe('DB', () => {
  let db;

  beforeEach(() => {
    db = new DB({ path: './tmp' }, 'test', true);
  });

  it('sets the DB path to sane default', () => {
    expect(
      new DB({}, 'test').path
    ).toEqual(defaults.PATH);
  });

  describe('put', () => {
    it('expects a key', () => {
      return db.put().catch((error) => {
        expect(error.message).toMatch(/Expected string key/);
      });
    });

    it('expects a value', () => {
      return db.put('test').catch((error) => {
        expect(error.message).toMatch(/Expected value/);
      });
    });

    it('sets the value', () => {
      return db.put('test', '123').then((result) => {
        expect(result).toEqual('123');
      });
    });
  });

  describe('get', () => {
    it('expects a key', () => {
      return db.get().catch((error) => {
        expect(error.message).toMatch(/Expected string key/);
      });
    });

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
    it('expects a key', () => {
      return db.del().catch((error) => {
        expect(error.message).toMatch(/Expected string key/);
      });
    });

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
