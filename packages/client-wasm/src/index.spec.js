// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isUndefined = require('@polkadot/util/is/undefined');

const Wasm = require('./');

describe('index', () => {
  it('exports the Wasm class', () => {
    expect(
      isUndefined(Wasm)
    ).toEqual(false);
  });
});
