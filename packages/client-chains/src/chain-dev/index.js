// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDefinition } from '../types';

const config = require('./config');
const initExecutor = require('../executor');
const initGenesis = require('../substrate/genesis');

module.exports = ({
  config,
  initExecutor,
  initGenesis
}: ChainDefinition);
