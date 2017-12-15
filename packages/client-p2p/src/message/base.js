// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isNumber = require('@polkadot/util/is/number');
const numberToBuffer = require('@polkadot/util/number/toBuffer');

module.exports = class BaseMessage {
  id: number;

  constructor (id: number) {
    assert(isNumber(id), 'Expected numeric id');

    this.id = id;
  }

  decodeRlp (id: number, raw: Array<any>): void {
    assert(isNumber(id), 'Expected numeric id');
    assert(id === this.id, 'Expected message id to match');
    assert(Array.isArray(raw), 'Expected raw message body');

    this._rawDecodeRlp(raw);
  }

  encodeRlp (): [Buffer, Array<any>] {
    return [
      numberToBuffer(this.id),
      this._rawEncodeRlp()
    ];
  }

  _rawDecodeRlp (raw: Array<any>): void {
    throw new ExtError('Expected _rawDecodeRlp() to be implemented');
  }

  _rawEncodeRlp (): Array<any> {
    throw new ExtError('Expected _rawEncodeRlp() to be implemented');
  }
};
