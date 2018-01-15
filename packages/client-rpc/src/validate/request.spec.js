// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { validateRequest } = require('./index');

describe('validateRequest', () => {
  it('fails when jsonrpc !== 2.0', () => {
    expect(
      () => validateRequest(0, '1.0')
    ).toThrow(/expected '2.0'/);
  });

  it('fails when id is non-numeric', () => {
    expect(
      () => validateRequest('someId', '2.0')
    ).toThrow(/numeric id/);
  });
});
