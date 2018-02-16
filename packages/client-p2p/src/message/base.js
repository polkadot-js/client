// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const numberToU8a = require('@polkadot/util/number/toU8a');

module.exports = class BaseMessage {
  id: number;

  constructor (id: number) {
    this.id = id;
  }

  decode (id: number, raw: Array<*>): void {
    assert(id === this.id, 'Expected message id to match');

    this._rawDecode(raw);
  }

  encode (): [Uint8Array, Array<*>] {
    return [
      numberToU8a(this.id),
      this._rawEncode()
    ];
  }

  _rawDecode (raw: Array<*>): void {
    throw new ExtError('Expected _rawDecode() to be implemented');
  }

  _rawEncode (): Array<*> {
    throw new ExtError('Expected _rawEncode() to be implemented');
  }
};
