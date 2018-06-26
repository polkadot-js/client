// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DbState } from './types';

export default function get ({ backend, pending }: DbState, k: Uint8Array): Uint8Array | null {
  const value = pending[k.toString()];

  if (value) {
    return value.v
      ? value.v.slice()
      : null;
  }

  return backend.get(k) || null;
}
