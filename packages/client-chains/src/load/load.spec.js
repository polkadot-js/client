// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const path = require('path');

const { loadChain } = require('../index');

describe('loadChain', () => {
  it('loads a chain from chains/*', () => {
    expect(
      loadChain({ chain: 'nelson' })
    ).toBeDefined();
  });

  it('fails when builtin not found', () => {
    expect(
      () => loadChain({ chain: 'not-a-chain' })
    ).toThrow(/Unable to load builtin/);
  });

  it.skip('loads a chain from a json specification (absolute)', () => {
    expect(
      loadChain({ chain: path.join(__dirname, 'chains', 'nelson.json') })
    ).toBeDefined();
  });

  it.skip('loads a chain from a json specification (relative)', () => {
    expect(
      loadChain('packages/client-chains/src/chains/nelson.json')
    ).toBeDefined();
  });

  it('fails when json file not found', () => {
    expect(
      () => loadChain({ chain: 'packages/not-a-chain.json' })
    ).toThrow(/Unable to locate and load chain file/);
  });

  it('validates the definitions, failing when not valid', () => {
    expect(
      () => loadChain({ chain: 'package.json' })
    ).toThrow(/should be an object/);
  });
});
