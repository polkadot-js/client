// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Chain from './index';

describe('client-chains', () => {
  const config = {
    chain: 'dev'
  };

  it('instantiates a known chain', () => {
    expect(
      new Chain(config).executor
    ).toBeDefined();
  });

  it('throws when chain not found', () => {
    config.chain = 'someUnknown';

    expect(
      () => new Chain(config)
    ).toThrow(/Unable to find builtin chain/);
  });
});
