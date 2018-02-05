// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const envStorage = require('./storage');

describe('envStorage', () => {
  const TEST = new Uint8Array([0x1, 0x2, 0x3]);

  let storage;

  beforeEach(() => {
    const db = {
      get: jest.fn((key) => Promise.resolve(true)),
      put: jest.fn((key, value) => Promise.resolve(true))
    };

    storage = envStorage(db);
  });

  it('sets the values & allows retrieval', () => {
    storage.set('0x123', TEST);

    expect(
      storage.get('0x123')
    ).toEqual(TEST);
  });

  it('sets values, and has the keys', () => {
    storage.set('0x123', TEST);

    expect(
      storage.keys()
    ).toEqual(['0x123']);
  });
});
