// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('@polkadot/util/is/function');

const streamReader = require('./reader');

describe('streamReader', () => {
  it('expects a handler callback', () => {
    expect(
      () => streamReader()
    ).toThrow(/handler function/);
  });

  it('returns a handler function', () => {
    expect(
      isFunction(
        streamReader(() => true)
      )
    ).toEqual(true);
  });

  it('returns the next handler on first call', (done) => {
    streamReader(() => true)((end, next) => {
      expect(
        isFunction(next)
      ).toEqual(true);
      done();
    });
  });

  it('next handler returns when end', (done) => {
    streamReader(() => true)((end, next) => {
      expect(
        next(true)
      ).toEqual(true);
      done();
    });
  });

  it('calls handler with the decoded message', (done) => {
    let isDone = false;

    streamReader((message) => {
      expect(message).toBeDefined();
      done();
    })((end, next) => {
      if (!isDone) {
        isDone = true;
        next(null, Buffer.from('cb00c900c100000000000000', 'hex'));
      }
    });
  });
});
