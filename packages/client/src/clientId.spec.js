// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

jest.mock('package-json');

const npmJson = require('package-json');
const clientId = require('./clientId');

describe('clientId', () => {
  it('returns <name>/<version>-<type>', () => {
    const [name, versionFull] = clientId.clientId.split('/');
    const [version, stability] = versionFull.split('-');

    expect(name.length).not.toEqual(0);
    expect(version).toEqual(clientId.version);
    expect(stability).toEqual(clientId.stability);
  });

  describe('getNpmVersion', () => {
    it('handles errors, returning unknown', () => {
      npmJson.mockImplementation(() => {
        return Promise.reject(new Error('some error'));
      });

      return clientId.getNpmVersion().then((version) => {
        expect(version).toEqual('unknown');
      });
    });

    it('queries the registry, returning latest', () => {
      npmJson.mockImplementation(() => {
        return Promise.resolve({ version: 'test' });
      });

      return clientId.getNpmVersion().then((version) => {
        expect(version).toEqual('test');
      });
    });
  });

  describe('getNpmStatus', () => {
    it('handles errors, returning unknown', () => {
      npmJson.mockImplementation(() => {
        return Promise.reject(new Error('some error'));
      });

      return clientId.getNpmStatus().then((version) => {
        expect(version).toEqual('cannot retrieve from npmjs.org');
      });
    });

    it('returns up-to-date when matching', () => {
      npmJson.mockImplementation(() => {
        return Promise.resolve({ version: clientId.version });
      });

      return clientId.getNpmStatus().then((version) => {
        expect(version).toEqual('up to date');
      });
    });

    it('queries the registry, returning latest', () => {
      npmJson.mockImplementation(() => {
        return Promise.resolve({ version: 'test' });
      });

      return clientId.getNpmStatus().then((version) => {
        expect(version).toEqual('outdated, test available');
      });
    });
  });
});
