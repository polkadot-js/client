// ISC, Copyright 2017 Jaco Greeff

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
