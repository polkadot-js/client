// ISC, Copyright 2017 Jaco Greeff

const path = require('path');

const { loadChain } = require('./index');

describe('loadChain', () => {
  it('expects a chain name', () => {
    expect(
      () => loadChain()
    ).toThrow(/Expected a chain name/);
  });

  it('loads a chain from chains/*', () => {
    expect(
      loadChain('nelson')
    ).toBeDefined();
  });

  it('fails when builtin not found', () => {
    expect(
      () => loadChain('not-a-chain')
    ).toThrow(/Unable to load builtin/);
  });

  it('loads a chain from a json specification (absolute)', () => {
    expect(
      loadChain(path.join(__dirname, 'chains', 'nelson.json'))
    ).toBeDefined();
  });

  it('loads a chain from a json specification (relative)', () => {
    expect(
      loadChain('packages/client-chains/src/chains/nelson.json')
    ).toBeDefined();
  });

  it('fails when json file not found', () => {
    expect(
      () => loadChain('packages/client-chains/chains/not-a-chain.json')
    ).toThrow(/Unable to locate and load chain file/);
  });

  it('validates the definitions, failing when not valid', () => {
    expect(
      () => loadChain('package.json')
    ).toThrow(/should be an object/);
  });
});
