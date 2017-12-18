// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { Options } from 'yargs';

const yargs = require('yargs');

const db = require('./db');
const operation = require('./operation');
const p2p = require('./p2p');
const rpc = require('./rpc');

module.exports = function argv (cli?: string): { [string]: any } {
  const parser = yargs
    .version(((operation['client-id'].default: any): string))
    .options(
      Object.assign(({}: { [string]: Options }), operation, db, p2p, rpc)
    )
    .group(Object.keys(operation), 'Operation')
    .group(Object.keys(db), 'Database')
    .group(Object.keys(p2p), 'Peer-to-peer')
    .group(Object.keys(rpc), 'RPC server')
    .strict();

  const parsed = cli
    ? parser.parse(cli).argv
    : parser.argv;

  return ((parsed: any): { [string]: any });
};
