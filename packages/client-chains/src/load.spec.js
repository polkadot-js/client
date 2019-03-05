// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Chain from './index';

describe('loadChain', () => {
  it('fails when builtin not found', () => {
    expect(
      () => new Chain({ config: 'not-a-chain' })
    ).toThrow(/Expected \.json extension/);
  });
});
