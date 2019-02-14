// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { createResponse } from './index';

describe('createResponse', () => {
  it('creates a valid JsonRpc structure', () => {
    expect(
      createResponse(123, 'test result')
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      result: 'test result'
    });
  });
});
