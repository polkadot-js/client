// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type ChainConfigType$Node = string;
export type ChainConfigType$Nodes = Array<ChainConfigType$Node>;

export type ChainConfigType$Genesis = {
  author: string,
  hash: string,
  parentHash: string,
  stateRoot: string
};

export type ChainConfigType$Params = {
  networkId: number
};

export type ChainConfigType = {
  description: string,
  genesis: ChainConfigType$Genesis,
  name: string,
  nodes: ChainConfigType$Nodes,
  params: ChainConfigType$Params;
};

export type ChainNameType = 'nelson';
