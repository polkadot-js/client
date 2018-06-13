// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const create = require('./create');

describe('create', () => {
  it('throws when class is not found', () => {
    expect(
      () => create(666)
    ).toThrow(/No message found/);
  });

  it('returns an instance of the create', () => {
    expect(
      create(0)
    ).toBeDefined();
  });
});
