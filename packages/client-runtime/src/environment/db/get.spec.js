// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import index from './index';

describe('get', () => {
  let int;

  beforeEach(() => {
    int = index({
      get: jest.fn(() => new Uint8Array([3, 4, 5]))
    });
  });

  it('retrieves a value', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2, 3, 4]));

    expect(
      int.get(new Uint8Array([1]))
    ).toEqual(
      new Uint8Array([2, 3, 4])
    );
  });

  it('retrieves a value from backed storage', () => {
    expect(
      int.get(new Uint8Array([1]))
    ).toEqual(
      new Uint8Array([3, 4, 5])
    );
  });
});
