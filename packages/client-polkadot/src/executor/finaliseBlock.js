// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { CallCreatorU8a } from './types';

module.exports = function finaliseBlock (createCaller: CallCreatorU8a, header: Uint8Array): Uint8Array {
  return createCaller('finalise_block')(header);
};
