// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isUndefined = require('@polkadot/util/is/undefined');

const module = require('./');

describe('client-rpc', () => {
  it('exports a defined object', () => {
    expect(
      isUndefined(module)
    ).toEqual(false);
  });
});
