// ISC, Copyright 2017-2018 Jaco Greeff

const isUndefined = require('@polkadot/util/is/undefined');

const module = require('./');

describe('client-rpc', () => {
  it('exports a defined object', () => {
    expect(
      isUndefined(module)
    ).toEqual(false);
  });
});
