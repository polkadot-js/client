// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { StateInterface } from '@polkadot/client-state/types';
import type { EndpointType } from './types';

const Rpc = require('@polkadot/client-rpc');

const client = require('./client');

const handlers: EndpointType = Object.assign({}, client);

module.exports = function initRpc (state: StateInterface): Rpc {
  return new Rpc(state, handlers);
};
