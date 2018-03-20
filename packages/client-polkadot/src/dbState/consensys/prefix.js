// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

module.exports = {
  AUTHORITY: u8aFromString(':auth:'),
  AUTHORITY_LENGTH: u8aFromString(':auth:len')
};
