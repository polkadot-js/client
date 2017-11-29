// ISC, Copyright 2017 Jaco Greeff

/* global jest */

const EthDevP2p = require('ethereumjs-devp2p');

const DevP2p = require('./index');

describe('DevP2p', () => {
  let dptSpy;
  let originalDPT;

  beforeEach(() => {
    dptSpy = jest.fn(() => true);
    originalDPT = EthDevP2p.DPT;
    EthDevP2p.DPT = class {
      constructor (config) {
        dptSpy(config);
      }

      on () {
      }

      bootstrap () {
        return Promise.resolve();
      }
    };
  });

  afterEach(() => {
    EthDevP2p.DPT = originalDPT;
  });

  describe('constructor', () => {
    it('creates an EthDevP2p.DPT instance', () => {
      new DevP2p({}); // eslint-disable-line

      expect(dptSpy).toHaveBeenCalled();
    });
  });
});
