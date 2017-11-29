// ISC, Copyright 2017 Jaco Greeff

/* global jest */

const EventEmitter = require('eventemitter3');

const attachError = require('./error');

describe('error', () => {
  let emitter;
  let handler;

  beforeEach(() => {
    handler = jest.fn();
    emitter = new EventEmitter();

    attachError(emitter, handler);
  });

  it('does not attach unknown events', () => {
    emitter.emit('unknown');

    expect(handler).not.toHaveBeenCalled();
  });

  it('attaches "discover.error"', () => {
    emitter.emit('discover.error', new Error('test'));

    expect(handler).toHaveBeenCalledWith({
      message: 'test',
      type: 'discover.error'
    });
  });
});
