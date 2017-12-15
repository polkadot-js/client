// ISC, Copyright 2017 Jaco Greeff

const { validateConfig } = require('./index');

describe('validateConfig', () => {
  it('throws when non-numeric port is specified', () => {
    expect(
      () => validateConfig({ port: 'abc' })
    ).toThrow(/numeric port/);
  });

  it('throws when type is not an array', () => {
    expect(
      () => validateConfig({ port: 123, type: 'notArray' })
    ).toThrow(/as an Array/);
  });

  it('throws when type is an empty array', () => {
    expect(
      () => validateConfig({ port: 123, type: [] })
    ).toThrow(/non-empty type/);
  });

  it('throws when unknown type is found', () => {
    expect(
      () => validateConfig({ port: 123, type: ['unknown', 'http', 'ws', 'none'] })
    ).toThrow(/Invalid RPC type found: 'unknown', 'none'/);
  });
});
