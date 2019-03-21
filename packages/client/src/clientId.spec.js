// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

jest.mock('package-json');

const npmJson = require('package-json');

const clientId = require('./clientId');

describe('clientId', () => {
  it('returns <name>/<version>', () => {
    const [name, version] = clientId.clientId.split('/');

    expect(name.length).not.toEqual(0);
    expect(version).toEqual(clientId.version);
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
        expect(version).toEqual(null);
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

    it('queries the registry, showing outdated', () => {
      npmJson.mockImplementation(() => {
        return Promise.resolve({ version: '99.99.99' });
      });

      return clientId.getNpmStatus().then((version) => {
        expect(version).toEqual('outdated, 99.99.99 available');
      });
    });

    it('queries the registry, showing newer', () => {
      npmJson.mockImplementation(() => {
        return Promise.resolve({ version: '0.0.0' });
      });

      return clientId.getNpmStatus().then((version) => {
        expect(version).toEqual('newer, 0.0.0 published');
      });
    });
  });
});
