// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { createError } from '.';

describe('createError', () => {
  it('creates a valid JSONRPC structure', () => {
    expect(
      createError(123, new Error('test message'))
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      error: {
        code: -1,
        message: 'test message'
      }
    });
  });
});
