// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

module.exports = {
  BALANCE_OF: u8aFromString('sta:bal:'),
  BONDAGE_OF: u8aFromString('sta:bon:'),
  BONDING_DURATION: u8aFromString('sta:loc'),
  CURRENT_ERA: u8aFromString('sta:era'),
  INTENT_WILL: u8aFromString('sta:wil:'),
  INTENT_WILL_LENGTH: u8aFromString('sta:wil:len'),
  LAST_ERA_LENGTH_CHANGE: u8aFromString('sta:lec'),
  NEXT_SESSIONS_PER_ERA: u8aFromString('sta:nse'),
  SESSIONS_PER_ERA: u8aFromString('sta:spe'),
  VALIDATOR_COUNT: u8aFromString('sta:vac')
};
