// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDefinitionLoose } from '../types';

const config = require('./config');
const executor = require('./executor');
const genesis = require('./genesis');

module.exports = ({
  config,
  executor,
  genesis
}: ChainDefinitionLoose);
