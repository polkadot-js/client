// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const encodeArray = require('./array');

describe('encodeArray', () => {
  it('encodes an array with the length', () => {
    expect(
      encodeArray([
        new Uint8Array([1, 2]),
        new Uint8Array([3, 4])
      ])
    ).toEqual(
      new Uint8Array([
        2, 0, 0, 0, // length
        1, 2, // first
        3, 4 // second
      ])
    );
  });
});
