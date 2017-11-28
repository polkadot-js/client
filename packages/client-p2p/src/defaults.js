// ISC, Copyright 2017 Jaco Greeff
// @flow

const bufferFromHex = require('@polkadot/util/buffer/fromHex');

const ADDRESS: string = '0.0.0.0';
const CLIENT_ID: string = 'client/0.0.0';
const MAX_PEERS: number = 25;
const PORT: number = 0;
const PRIVATE_KEY: Buffer = bufferFromHex('0xd772e3d6a001a38064dd23964dd2836239fa0e6cec8b28972a87460a17210fe9');

module.exports = {
  ADDRESS,
  CLIENT_ID,
  MAX_PEERS,
  PORT,
  PRIVATE_KEY
};
