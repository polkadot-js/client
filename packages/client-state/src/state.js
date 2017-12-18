// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { ConfigType, StateInterface, StateType$Genesis, StateType$Best, StateType$Parachain, StateType$Validator } from './types';

const loadChain = require('@polkadot/client-chains/load');

const StateBest = require('./state/best');
const StateGenesis = require('./state/genesis');
const StateParachain = require('./state/parachain');
const StateValidator = require('./state/validator');

module.exports = class State implements StateInterface {
  best: StateType$Best;
  chain: ChainConfigType;
  config: ConfigType;
  genesis: StateType$Genesis;
  parachain: StateType$Parachain;
  validator: StateType$Validator;

  constructor (config: ConfigType) {
    this.config = config;
    this.chain = loadChain(config.chain);

    this.best = new StateBest(this.chain.genesis.hash);
    this.genesis = new StateGenesis(this.chain.genesis);
    this.parachain = new StateParachain();
    this.validator = new StateValidator();
  }
};
