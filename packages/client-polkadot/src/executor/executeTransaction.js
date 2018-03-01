// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { CallCreatorU8a } from './types';

const u8aConcat = require('@polkadot/util/u8a/concat');

module.exports = function executeTransaction (createCaller: CallCreatorU8a, header: Uint8Array, utx: Uint8Array): Uint8Array {
  return createCaller('execute_transaction')(
    u8aConcat([ header, utx ])
  );
};
