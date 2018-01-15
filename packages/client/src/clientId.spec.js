// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const clientId = require('./clientId');

describe('clientId', () => {
  it('returns <name>/<version>-<type>', () => {
    const [name, versionFull] = clientId.split('/');
    const [version, stability] = versionFull.split('-');

    expect(name.length).not.toEqual(0);
    expect(version.length).not.toEqual(0);
    expect(stability.length).not.toEqual(0);
  });
});
