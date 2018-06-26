// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import index from './index';

describe('set', () => {
  let backend;
  let int;

  beforeEach(() => {
    backend = {
      pairs: () => []
    };

    int = index(backend);
  });

  it('sets the value', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));

    expect(
      int.isEmpty()
    ).toEqual(false);
  });

  it('sets the value (retrievable)', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));

    expect(
      int.pairs()
    ).toEqual([
      { k: new Uint8Array([1]), v: new Uint8Array([2]) }
    ]);
  });
});
