// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '../../types';

import yargs from 'yargs';

import { isDevelopment } from '../../clientId';
import db from './db';
import dev from './dev';
import operation from './operation';
import p2p from './p2p';
import rpc from './rpc';
import wasm from './wasm';

export default function argv (cli?: string): Config {
  const devOpts = isDevelopment
    ? dev
    : {};
  const parser = yargs
    // flowlint-next-line unclear-type:off
    .version((operation['client-id'].default: any))
    .options({
      ...devOpts, ...operation, ...db, ...p2p, ...rpc, ...wasm
    })
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
  return (parsed: any);
}
