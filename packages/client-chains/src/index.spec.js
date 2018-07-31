// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import HashDb from '@polkadot/client-db/Hash/Memory';
import MemoryDb from '@polkadot/client-db/Trie/Memory';

import Chain from './index';

describe('client-chains', () => {
  const config = {
    chain: 'dev'
  };
  const blockDb = new HashDb();
  const stateDb = new MemoryDb();

  it('instantiates a known chain', () => {
    expect(
      new Chain(config, stateDb, blockDb).executor
    ).toBeDefined();
  });

  it('throws when chain not found', () => {
    config.chain = 'someUnknown';

    expect(
      () => new Chain(config, stateDb, blockDb)
    ).toThrow(/Unable to find builtin chain/);
  });

  it('terminates', () => {
    return stateDb.terminate();
  });
});
