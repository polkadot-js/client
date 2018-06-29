// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Header } from '@polkadot/primitives/header';

export type BlockResponseEncoded$BlockData = {
  hash: string,
  header: Header,
  body: Array<Array<number>>,
  receipt?: string,
  messageQueue?: string,
  justification?: {},
}

export type BlockResponseEncoded = {
  id: number,
  blocks: Array<BlockResponseEncoded$BlockData>
};
