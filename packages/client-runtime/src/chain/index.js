// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Chain } from '../types';

module.exports = function ({ l, chain }: RuntimeEnv): RuntimeInterface$Chain {
  return {
    chain_id: () => {
      l.debug(() => ['chain_id', '->', chain.networkId.toNumber()]);

      return chain.networkId.toNumber();
    }
  };
};
