// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  BALANCE_OF: key('sta:bal:'),
  BONDAGE_OF: key('sta:bon:'),
  BONDING_DURATION: key('sta:loc'),
  CURRENT_ERA: key('sta:era'),
  INTENT_WILL: key('sta:wil:'),
  INTENT_WILL_LENGTH: key('sta:wil:len'),
  LAST_ERA_LENGTH_CHANGE: key('sta:lec'),
  NEXT_SESSIONS_PER_ERA: key('sta:nse'),
  SESSIONS_PER_ERA: key('sta:spe'),
  VALIDATOR_COUNT: key('sta:vac')
};
