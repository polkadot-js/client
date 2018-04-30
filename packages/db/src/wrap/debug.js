// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '../types';

module.exports = function debug (baseDb: BaseDbInterface): { [string]: string } {
  return baseDb.pairs().reduce((result, { k, v }) => {
    result[k.toString()] = `[${v.toString()}]`;

    return result;
  }, {});
};
