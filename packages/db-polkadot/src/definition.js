// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Definition } from '@polkadot/db/types';

const consensus = require('./consensus');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');

module.exports = ({
  consensus,
  governance,
  session,
  staking,
  system
}: State$Definition);
