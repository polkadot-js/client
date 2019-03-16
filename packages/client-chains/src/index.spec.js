// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Chain from '.';

describe('client-chains', () => {
  const config = {
    chain: 'alexander',
    db: { type: 'memory' }
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
    ).toThrow(/Expected \.json extension/);
  });
});
