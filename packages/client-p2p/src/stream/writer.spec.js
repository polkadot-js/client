// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('@polkadot/util/is/function');

const StatusMessage = require('../message/status');
const streamWriter = require('./writer');

describe('streamWriter', () => {
  let message;

  beforeEach(() => {
    message = new StatusMessage();
  });

  it('expects a message as input', () => {
    expect(
      () => streamWriter()
    ).toThrow(/valid message/);
  });

  it('returns a handler function', () => {
    expect(
      isFunction(
        streamWriter(message)
      )
    ).toEqual(true);
  });

  it('calls back with end=true when ended', (done) => {
    streamWriter(message)(true, (end) => {
      expect(end).toEqual(true);
      done();
    });
  });

  it('calls back with end=Error with error', (done) => {
    streamWriter(message)(new Error('test end'), (error) => {
      expect(error.message).toEqual('test end');
      done();
    });
  });

  it('calls back with the message on first call', (done) => {
    streamWriter(message)(null, (end, message) => {
      expect(
        Buffer.isBuffer(message)
      ).toEqual(true);
      done();
    });
  });

  it('calls back with end on second call', (done) => {
    const writer = streamWriter(message);

    writer(null, () => true);
    writer(null, (end) => {
      expect(end).toEqual(true);
      done();
    });
  });
});
