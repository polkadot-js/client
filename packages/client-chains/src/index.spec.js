// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import memoryDb from '@polkadot/util-triedb/temp';

import createChain from './index';

describe('client-chains', () => {
  let config;
  let blockDb;
  let stateDb;

  beforeEach(() => {
    config = {
      chain: 'dev'
    };
    blockDb = memoryDb();
    stateDb = memoryDb();
  });

  it('instantiates a known chain', () => {
    expect(
      createChain(config, stateDb, blockDb).executor
    ).toBeDefined();
  });

  it('throws when chain not found', () => {
    config.chain = 'someUnknown';

    expect(
      () => createChain(config, stateDb, blockDb)
    ).toThrow(/Unable to find builtin chain/);
  });
});
