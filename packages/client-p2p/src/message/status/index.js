// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { StatusMessage } from './types';

const BN = require('bn.js');

const defaults = require('../../defaults');

module.exports = function messageStatus (): StatusMessage {
  return {
    version: defaults.PROTOCOL_VERSION,
    roles: [],
    bestNumber: new BN(0),
    bestHash: '',
    genesisHash: ''
  };
};
