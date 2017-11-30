// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { Options } from 'yargs';

const yargs = require('yargs');

const general = require('./general');
const p2p = require('./p2p');
const rpc = require('./rpc');
const clientId = require('../../clientId');

module.exports = function argv (cli?: string): { [string]: any } {
  const parser = yargs
    .version(clientId)
    .options(
      Object.assign(({}: { [key: string]: Options }), general, p2p, rpc)
    )
    .group(Object.keys(p2p), 'Peer-to-peer')
    .group(Object.keys(rpc), 'RPC server')
    .strict();

  const parsed = cli
    ? parser.parse(cli).argv
    : parser.argv;

  return ((parsed: any): { [string]: any });
};
