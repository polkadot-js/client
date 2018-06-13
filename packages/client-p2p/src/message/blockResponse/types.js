// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type BlockResponseEncoded$BlockData = {
  hash: string,
  header?: string,
  body?: string,
  receipt?: string,
  messageQueue?: string,
  justification?: {},
}

export type BlockResponseEncoded = {
  id: number,
  blocks: Array<BlockResponseEncoded$BlockData>
};
