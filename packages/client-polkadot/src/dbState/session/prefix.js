// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

module.exports = {
  CURRENT_INDEX: u8aFromString('ses:ind'),
  LAST_LENGTH_CHANGE: u8aFromString('ses:llc'),
  NEXT_KEY_FOR: u8aFromString('ses:nxt:'),
  NEXT_SESSION_LENGTH: u8aFromString('ses:nln'),
  SESSION_LENGTH: u8aFromString('ses:len'),
  VALUE: u8aFromString('ses:val:'),
  VALUE_LENGTH: u8aFromString('ses:val:len')
};
