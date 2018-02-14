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

  // flowlint-next-line unclear-type:off
  decode (id: number, raw: Array<any>): void {
    assert(id === this.id, 'Expected message id to match');

    this._rawDecode(raw);
  }

  // flowlint-next-line unclear-type:off
  encode (): [Uint8Array, Array<any>] {
    return [
      numberToU8a(this.id),
      this._rawEncode()
    ];
  }

  // flowlint-next-line unclear-type:off
  _rawDecode (raw: Array<any>): void {
    throw new ExtError('Expected _rawDecode() to be implemented');
  }

  // flowlint-next-line unclear-type:off
  _rawEncode (): Array<any> {
    throw new ExtError('Expected _rawEncode() to be implemented');
  }
};
