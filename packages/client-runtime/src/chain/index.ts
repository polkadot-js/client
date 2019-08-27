// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterfaceChain } from '../types';

import instrument from '../instrument';

export default function ({ l }: RuntimeEnv): RuntimeInterfaceChain {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    chain_id: (): number =>
      instrument('chain_id', (): number => {
        l.debug((): any[] => ['chain_id', '->', 0]);

        // FIXME This is not correct, to be retrieved
        return 0;
      })
  };
}
