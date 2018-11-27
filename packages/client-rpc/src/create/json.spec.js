// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createJson from './json';

describe('createJson', () => {
  it('creates a valid JSONRPC structure', () => {
    expect(
      createJson(123, { some: { extra: 'data' } })
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      some: {
        extra: 'data'
      }
    });
  });
});
