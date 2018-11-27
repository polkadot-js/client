// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ExtError } from '@polkadot/util';

import { createError } from './index';

describe('createError', () => {
  it('creates a valid JSONRPC structure', () => {
    expect(
      createError(123, new ExtError('test message', 666))
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      error: {
        code: 666,
        message: 'test message'
      }
    });
  });

  it('creates a valid JSONRPC structure (from Error, non-ExtError)', () => {
    expect(
      createError(123, new Error('test message'))
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      error: {
        code: ExtError.CODES.UNKNOWN,
        message: 'test message'
      }
    });
  });
});
