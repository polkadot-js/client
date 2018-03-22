// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDefinitionLoose, ChainName } from './types';

const demo = require('./chain-demo');
const nelson = require('./chain-nelson');

module.exports = ({
  demo,
  nelson
}: { [ChainName]: ChainDefinitionLoose });
