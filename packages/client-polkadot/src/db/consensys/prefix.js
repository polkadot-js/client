// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const AUTHORITY: Uint8Array = u8aFromString(':auth:');
const AUTHORITY_LENGTH: Uint8Array = u8aFromString(':auth:len');

module.exports = {
  AUTHORITY,
  AUTHORITY_LENGTH
};
