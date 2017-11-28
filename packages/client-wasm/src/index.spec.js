// ISC, Copyright 2017 Jaco Greeff

const isUndefined = require('@polkadot/util/is/undefined');

const Wasm = require('./');

describe('index', () => {
  it('exports the Wasm class', () => {
    expect(
      isUndefined(Wasm)
    ).toEqual(false);
  });
});
