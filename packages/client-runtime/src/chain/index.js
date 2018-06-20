// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Chain } from '../types';

import instrument from '../instrument';

export default function ({ l }: RuntimeEnv): RuntimeInterface$Chain {
  return {
    chain_id: (): number =>
      instrument('chain_id', () => {
        l.debug(() => ['chain_id', '->', 0]);

        // FIXME This is not correct, to be retrieved
        return 0;
      })
  };
}
