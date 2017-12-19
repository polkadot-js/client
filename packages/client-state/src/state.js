// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { StateInterface, StateType$Genesis, StateType$Best, StateType$Parachain, StateType$Validator } from './types';

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

    this.best = new StateBest(chain.genesis.hash);
    this.genesis = new StateGenesis(chain.genesis);
    this.parachain = new StateParachain();
    this.validator = new StateValidator();
  }
};
