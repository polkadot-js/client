// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '../../types';

import yargs from 'yargs';

import db from './db';
import operation from './operation';
import p2p from './p2p';
import rpc from './rpc';
import telemetry from './telemetry';
import wasm from './wasm';

export default function argv (cli?: string): Config {
  const parser = yargs
    .version(operation['client-id'].default)
    .options({
      ...operation, ...db, ...p2p, ...rpc, ...telemetry, ...wasm
    })
    .wrap(
      Math.min(120, yargs.terminalWidth())
    )
    .group(Object.keys(operation), 'Operation')
    .group(Object.keys(db), 'Database')
    .group(Object.keys(p2p), 'Peer-to-peer')
    .group(Object.keys(rpc), 'RPC server')
    .group(Object.keys(telemetry), 'Telemetry client')
    .group(Object.keys(wasm), 'Wasm Runtime')
    .strict();

  const parsed = cli
    ? parser.parse(cli).argv
    : parser.argv;

  return (parsed as Config);
}
