// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import loadChain from './load';

describe('loadChain', () => {
  it('loads a chain from chains/*', () => {
    expect(
      loadChain('dev')
    ).toBeDefined();
  });

  it('fails when builtin not found', () => {
    expect(
      () => loadChain('not-a-chain')
    ).toThrow(/Unable to find builtin/);
  });
});
