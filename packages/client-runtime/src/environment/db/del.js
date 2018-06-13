// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbState } from './types';

module.exports = function del ({ pending }: DbState, k: Uint8Array): void {
  pending[k] = {
    k: k.slice(),
    v: null
  };
};
