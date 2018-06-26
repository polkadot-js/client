// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

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
