// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { StateInterface, StateType$Genesis, StateType$Best, StateType$Parachain, StateType$Validator } from './types';

const hexToU8a = require('@polkadot/util/hex/toU8a');

const StateBest = require('./state/best');
const StateGenesis = require('./state/genesis');
const StateParachain = require('./state/parachain');
const StateValidator = require('./state/validator');

module.exports = class State implements StateInterface {
  best: StateType$Best;
  chain: ChainConfigType;
  genesis: StateType$Genesis;
  parachain: StateType$Parachain;
  validator: StateType$Validator;

  constructor (chain: ChainConfigType) {
    this.chain = chain;

    this.best = new StateBest(hexToU8a(chain.genesis.hash, 256));
    this.genesis = new StateGenesis(chain.genesis);
    this.parachain = new StateParachain();
    this.validator = new StateValidator();
  }
};
