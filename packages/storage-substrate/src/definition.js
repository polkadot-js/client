// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef } from '@polkadot/storage/types';

const consensus = require('./consensus');
const council = require('./council');
const councilVoting = require('./councilVoting');
const democracy = require('./democracy');
const governance = require('./governance');
const session = require('./session');
const staking = require('./staking');
const system = require('./system');
const timestamp = require('./timestamp');

module.exports = ({
  consensus,
  council,
  councilVoting,
  democracy,
  governance,
  session,
  staking,
  system,
  timestamp
}: StorageDef);
