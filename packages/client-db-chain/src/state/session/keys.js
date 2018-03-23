// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  CURRENT_INDEX: key('ses:ind'),
  LAST_LENGTH_CHANGE: key('ses:llc'),
  NEXT_KEY_FOR: key('ses:nxt:'),
  NEXT_SESSION_LENGTH: key('ses:nln'),
  SESSION_LENGTH: key('ses:len'),
  VALUE: key('ses:val:'),
  VALUE_COUNT: key('ses:val:len')
};
