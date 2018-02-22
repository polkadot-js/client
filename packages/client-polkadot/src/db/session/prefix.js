// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const CURRENT_INDEX: Uint8Array = u8aFromString('ses:ind');
const LAST_LENGTH_CHANGE: Uint8Array = u8aFromString('ses:llc');
const NEXT_KEY_FOR: Uint8Array = u8aFromString('ses:nxt:');
const NEXT_SESSION_LENGTH: Uint8Array = u8aFromString('ses:nln');
const SESSION_LENGTH: Uint8Array = u8aFromString('ses:len');
const VALUE: Uint8Array = u8aFromString('ses:val:');
const VALUE_LENGTH: Uint8Array = u8aFromString('ses:val:len');

module.exports = {
  CURRENT_INDEX,
  LAST_LENGTH_CHANGE,
  NEXT_KEY_FOR,
  NEXT_SESSION_LENGTH,
  SESSION_LENGTH,
  VALUE,
  VALUE_LENGTH
};
