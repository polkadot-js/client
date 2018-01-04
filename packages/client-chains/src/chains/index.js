// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { ChainConfigType, ChainNameType } from '../types';

const nelson = require('./nelson');

module.exports = ({
  nelson
}: { [ChainNameType]: ChainConfigType });
