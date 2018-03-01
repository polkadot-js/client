// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { CallCreator } from './types';

module.exports = function executeBlock (createCaller: CallCreator, block: Uint8Array): boolean {
  const result = createCaller('execute_block')(block);

  return result.lo === 1;
};
