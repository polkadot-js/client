// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pErrorEventTypes, P2pOnErrorCallback } from '../types';

const EventEmitter = require('eventemitter3');

module.exports = function attachError (emitter: EventEmitter, handler: P2pOnErrorCallback): void {
  const onWrapper = (type: P2pErrorEventTypes) => {
    emitter.on(type, (error: Error): void => {
      handler({
        message: error.message,
        type
      });
    });
  };

  onWrapper('comms.error');
  onWrapper('comms.error.peer');
  onWrapper('discover.error');
  onWrapper('discover.error.bootnode');
  onWrapper('discover.error.peer');
};
