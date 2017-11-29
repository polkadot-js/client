// ISC, Copyright 2017 Jaco Greeff
// @flow

const clientId = require('../../clientId');

module.exports = async function clientVersion (): Promise<string> {
  return clientId;
};
