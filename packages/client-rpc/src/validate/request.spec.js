// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import validateRequest from './request';

describe('validateRequest', () => {
  it('fails when jsonrpc !== 2.0', () => {
    expect(
      () => validateRequest(0, '1.0')
    ).toThrow(/expected '2.0'/);
  });

  it('fails when id is non-numeric', () => {
    expect(
      () => validateRequest('someId', '2.0')
    ).toThrow(/numeric id/);
  });
});
