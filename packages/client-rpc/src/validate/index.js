// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const validateConfig = require('./config');
const validateHandlers = require('./handlers');
const validateRequest = require('./request');

module.exports = {
  validateConfig,
  validateHandlers,
  validateRequest
};
