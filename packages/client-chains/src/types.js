// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainConfigType$Node = string;
export type ChainConfigType$Nodes = Array<ChainConfigType$Node>;

export type ChainConfigType$Balances = {
  [string]: BN
};

export type ChainConfigType$Genesis = {
  author: Uint8Array,
  hash: Uint8Array,
  stateRoot: Uint8Array
};

export type ChainConfigType$Params = {
  approvalRatio: BN,
  blockTime: BN,
  bondingDuration: BN,
  networkId: BN,
  sessionLength: BN,
  sessionsPerEra: BN
};

export type ChainConfigType$Number = BN | number | string;

export type ChainConfigType$Types = 'polkadot';

export type ChainConfigTypeLoose = {
  authorities: Array<string>,
  balances: {
    [string]: ChainConfigType$Number
  },
  code: Uint8Array,
  description: string,
  name: string,
  nodes: ChainConfigType$Nodes,
  params: {
    approvalRatio: ChainConfigType$Number,
    blockTime: ChainConfigType$Number,
    bondingDuration: ChainConfigType$Number,
    networkId: ChainConfigType$Number,
    sessionLength: ChainConfigType$Number,
    sessionsPerEra: ChainConfigType$Number
  },
  type: ChainConfigType$Types,
  validators: Array<string>
};

export type ChainConfigType = {
  authorities: Array<Uint8Array>,
  balances: ChainConfigType$Balances,
  code: Uint8Array,
  description: string,
  genesis: ChainConfigType$Genesis,
  name: string,
  nodes: ChainConfigType$Nodes,
  params: ChainConfigType$Params,
  type: ChainConfigType$Types,
  validators: Array<Uint8Array>
};

export type ChainNameType = 'nelson';
