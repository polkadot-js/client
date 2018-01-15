// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const ExtError = require('@polkadot/util/ext/error');

const { createError } = require('./index');

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
