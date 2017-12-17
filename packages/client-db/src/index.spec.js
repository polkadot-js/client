// ISC, Copyright 2017 Jaco Greeff

const isUndefined = require('@polkadot/util/is/undefined');

const DB = require('./');

describe('index', () => {
  it('exports the DB class', () => {
    expect(
      isUndefined(DB)
    ).toEqual(false);
  });
});
