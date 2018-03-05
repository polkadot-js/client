// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const stop = require('./stop');

describe('stop', () => {
  let self;

  beforeEach(() => {
    self = {
      config: {
        rpc: {
          port: 9901,
          path: '/',
          types: ['http']
        }
      },
      emitter: new EventEmitter(),
      l: {
        log: jest.fn()
      },
      server: {
        close: () => true
      }
    };
  });

  it('returns false when internal server not started', () => {
    self.server = null;

    return stop(self).then((result) => {
      expect(result).toEqual(false);
    });
  });

  it('calls stop() on the internal server', (done) => {
    self.server = {
      close: () => {
        expect(self.server).toEqual(null);
        done();
      }
    };

    stop(self);
  });

  it('emits the stopped event', (done) => {
    console.log('self', self.emitter);

    self.emitter.on('stopped', () => {
      done();
    });

    stop(self);
  });

  it('returns true when completed', () => {
    return stop(self).then((result) => {
      expect(result).toEqual(true);
    });
  });
});
