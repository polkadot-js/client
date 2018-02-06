// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function asNibbles (bytes: Uint8Array | Array<number>): Uint8Array {
  return bytes.reduce((result, byte, index) => {
    result.set(
      [byte >> 4, byte & 0b1111],
      index * 2
    );

    return result;
  }, new Uint8Array(bytes.length * 2));
};
