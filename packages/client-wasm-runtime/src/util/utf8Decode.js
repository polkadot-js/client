// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

require('./polyfill');

const decoder = new TextDecoder('utf-8');

module.exports = function utf8Decode (u8a: Uint8Array): string {
  return decoder.decode(u8a);
};
