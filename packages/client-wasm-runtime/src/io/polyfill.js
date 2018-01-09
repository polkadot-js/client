// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
