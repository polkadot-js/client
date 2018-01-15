// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { validateConfig } = require('./index');

describe('validateConfig', () => {
  it('throws when path does not start with /', () => {
    expect(
      () => validateConfig({ path: 'blah' })
    ).toThrow(/valid path/);
  });

  it('throws when type is an empty array', () => {
    expect(
      () => validateConfig({ path: '/', types: [] })
    ).toThrow(/non-empty type/);
  });

  it('throws when unknown type is found', () => {
    expect(
      () => validateConfig({ path: '/', types: ['unknown', 'http', 'ws', 'none'] })
    ).toThrow(/Invalid RPC type found: 'unknown', 'none'/);
  });
});
