// ISC, Copyright 2017-2018 Jaco Greeff
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
  networkId: string
};

export type ChainConfigType = {
  description: string,
  genesis: ChainConfigType$Genesis,
  name: string,
  nodes: ChainConfigType$Nodes,
  params: ChainConfigType$Params;
};

export type ChainNameType = 'nelson';
