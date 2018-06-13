// Copyright 2017-2018 @polkadot/client authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '../../types';

const yargs = require('yargs');

const { isDevelopment } = require('../../clientId');
const db = require('./db');
const dev = require('./dev');
const operation = require('./operation');
const p2p = require('./p2p');
const rpc = require('./rpc');
const wasm = require('./wasm');

module.exports = function argv (cli?: string): Config {
  const devOpts = isDevelopment
    ? dev
    : {};
  const parser = yargs
    // flowlint-next-line unclear-type:off
    .version(((operation['client-id'].default: any): string))
    .options(
      Object.assign({}, devOpts, operation, db, p2p, rpc, wasm)
    )
    .wrap(
      Math.min(120, yargs.terminalWidth())
    )
    .group(Object.keys(devOpts), 'Development')
    .group(Object.keys(operation), 'Operation')
    .group(Object.keys(db), 'Database')
    .group(Object.keys(p2p), 'Peer-to-peer')
    .group(Object.keys(rpc), 'RPC server')
    .group(Object.keys(wasm), 'WASM Runtime')
    .strict();

  // flowlint-next-line sketchy-null-string:off
  const parsed = cli
    ? parser.parse(cli).argv
    : parser.argv;

  // flowlint-next-line unclear-type:off
  return ((parsed: any): Config);
};
