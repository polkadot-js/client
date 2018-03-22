// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const loadChain = require('./index');

describe('loadChain', () => {
  it('loads a chain from chains/*', () => {
    expect(
      loadChain('nelson')
    ).toBeDefined();
  });

  it('fails when builtin not found', () => {
    expect(
      () => loadChain('not-a-chain')
    ).toThrow(/Unable to find builtin/);
  });

  it('validates the definitions, failing when not valid', () => {
    expect(
      () => loadChain('package.json')
    ).toThrow(/should be an object/);
  });
});
