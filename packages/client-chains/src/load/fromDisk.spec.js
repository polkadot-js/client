// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const path = require('path');

const fromDisk = require('./fromDisk');

describe('fromDisk', () => {
  it('loads a chain from a json specification (absolute)', () => {
    expect(
      fromDisk(path.join(__dirname, '..', '..', 'package.json'))
    ).toBeDefined();
  });

  it('loads a chain from a json specification (relative)', () => {
    expect(
      fromDisk('packages/client-chains/package.json')
    ).toBeDefined();
  });

  it('fails when json file not found', () => {
    expect(
      () => fromDisk('not-a-chain.json')
    ).toThrow(/Unable to locate and load chain file/);
  });
});
