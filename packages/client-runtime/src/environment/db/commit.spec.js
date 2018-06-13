// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('commit', () => {
  let backend;
  let int;

  beforeEach(() => {
    backend = {
      commit: jest.fn(),
      pairs: jest.fn(() => [])
    };

    int = index(backend);
  });

  it('clears storage after commit', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));
    int.commit();

    expect(
      int.isEmpty()
    ).toEqual(true);
  });

  it('calls backend commit', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));
    int.commit();

    expect(
      backend.commit
    ).toHaveBeenCalledWith([
      { k: new Uint8Array([1]), v: new Uint8Array([2]) }
    ]);
  });
});
