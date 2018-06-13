// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { RpcInterface } from '@polkadot/client-rpc/types';

export type AllInterfaces = {
  chain: ChainInterface,
  p2p: P2pInterface,
  rpc: RpcInterface
};
