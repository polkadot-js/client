// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const validateConfig = require('./config');
const validateHandlers = require('./handlers');
const validateRequest = require('./request');

module.exports = {
  validateConfig,
  validateHandlers,
  validateRequest
};
