// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const BALANCE_OF: Uint8Array = u8aFromString('sta:bal:');
const BONDAGE_OF: Uint8Array = u8aFromString('sta:bon:');
const BONDING_DURATION: Uint8Array = u8aFromString('sta:loc');
const CURRENT_ERA: Uint8Array = u8aFromString('sta:era');
const LAST_ERA_LENGTH_CHANGE: Uint8Array = u8aFromString('sta:lec');
const NEXT_SESSIONS_PER_ERA: Uint8Array = u8aFromString('sta:nse');
const SESSIONS_PER_ERA: Uint8Array = u8aFromString('sta:spe');
const VALIDATOR_COUNT: Uint8Array = u8aFromString('sta:vac');

module.exports = {
  BALANCE_OF,
  BONDAGE_OF,
  BONDING_DURATION,
  CURRENT_ERA,
  LAST_ERA_LENGTH_CHANGE,
  NEXT_SESSIONS_PER_ERA,
  SESSIONS_PER_ERA,
  VALIDATOR_COUNT
};
