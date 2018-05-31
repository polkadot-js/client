// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDefinition, ChainName } from './types';

const dev = require('./chain-dev');

module.exports = ({
  dev
}: { [ChainName]: ChainDefinition });
