// ISC, Copyright 2017 Jaco Greeff
// @flow

const EventEmitter = require('eventemitter3');

module.exports = class BaseProtocol extends EventEmitter {
  _send: (code: number, payload: Buffer) => void;

  constructor (send: (code: number, payload: Buffer) => void) {
    super();

    this._send = send;
  }

  receive (code: number, data: Buffer): any {
    // const payload = rlp.decode(data);
  }

  send (code: number, payload: Array<Buffer>): any {
    // this._send(code, rlp.encode(payload));
  }
};
