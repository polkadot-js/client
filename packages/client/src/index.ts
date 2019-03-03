// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from './types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { P2pInterface } from '@polkadot/client-p2p/types';
import { RpcInterface } from '@polkadot/client-rpc/types';
import { TelemetryInterface } from '@polkadot/client-telemetry/types';

import './license';

import BN from 'bn.js';
import Chain from '@polkadot/client-chains/index';
import Telemetry from '@polkadot/client-telemetry/index';
import Rpc from '@polkadot/client-rpc/index';
import P2p from '@polkadot/client-p2p/index';
import { logger, isUndefined, u8aToHex } from '@polkadot/util';

import * as clientId from './clientId';
import defaults from './defaults';
import cli from './cli';

const l = logger('client');

class Client {
  private chain?: ChainInterface;
  private informantId?: NodeJS.Timer;
  private p2p?: P2pInterface;
  private rpc?: RpcInterface;
  private telemetry?: TelemetryInterface;
  private prevBest?: BN;
  private prevTime: number;

  constructor () {
    this.prevTime = Date.now();
  }

  async start (config: Config) {
    const verStatus = await clientId.getNpmStatus();

    l.log(`Running version ${clientId.version} (${verStatus})`);
    l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

    this.chain = new Chain(config);
    this.p2p = new P2p(config, this.chain);
    this.rpc = new Rpc(config, this.chain);
    this.telemetry = new Telemetry(config, this.chain);

    await this.p2p.start();
    await this.rpc.start();
    await this.telemetry.start();

    this.startInformant();
  }

  stop () {
    this.stopInformant();

    // TODO We need to destroy/stop the p2p, rpc, etc interfaces created in the start()
    // here as well.
  }

  private startInformant () {
    let lastImport = 0;

    this.informantId = setInterval(this.runInformant, defaults.INFORMANT_DELAY);

    if (isUndefined(this.p2p)) {
      return;
    }

    this.p2p.sync.on('imported', () => {
      if (!isUndefined(this.telemetry)) {
        const now = Date.now();

        if ((now - lastImport) >= defaults.IMPORT_INTERVAL) {
          lastImport = now;
          this.telemetry.blockImported();
        }
      }
    });
  }

  private stopInformant () {
    if (!isUndefined(this.informantId)) {
      clearInterval(this.informantId);
    }

    this.informantId = undefined;
  }

  private runInformant = () => {
    if (isUndefined(this.chain) || isUndefined(this.p2p) || isUndefined(this.rpc)) {
      this.stopInformant();

      return;
    }

    const now = Date.now();
    const elapsed = now - this.prevTime;
    const numPeers = this.p2p.getNumPeers();
    const bestHash = this.chain.blocks.bestHash.get();
    const bestNumber = this.chain.blocks.bestNumber.get();
    const status = this.p2p.sync.status;
    const isSync = status === 'Sync';
    const hasBlocks = this.prevBest && this.prevBest.lt(bestNumber);
    const numBlocks = hasBlocks && this.prevBest ? bestNumber.sub(this.prevBest) : new BN(1);
    const newSpeed = isSync
      ? ` (${(elapsed / numBlocks.toNumber()).toFixed(0)} ms/block)`
      : '';
    const newBlocks = hasBlocks && this.prevBest
      ? `, +${numBlocks.toString()} blocks${newSpeed}`
      : '';
    const target = isSync
      ? `, target #${this.p2p.sync.bestSeen.toString()}`
      : '';

    l.log(`${status} (${numPeers} peers)${target}, current #${bestNumber.toNumber()}, ${u8aToHex(bestHash, 48)}${newBlocks}`);

    this.prevBest = bestNumber;
    this.prevTime = now;

    if (!isUndefined(this.telemetry)) {
      this.telemetry.intervalInfo(numPeers, status);
    }
  }
}

// FIXME Catch the uncaught errors that weren't wrapped in a domain or try catch statement
// This was added due to exceptions from p2p streams, for which no pass-through handler exists
// and none can be added. As it stands, not a bad idea since it shows where stuff breaks
// instead of just exiting, however we should _never_ have these - and we have a couple that
// puts the app into an unknown state
// process.on('uncaughtException', (err: Error) => {
//   l.error('Uncaught exception', err);
// });

new Client()
  .start(cli())
  .catch((error) => {
    console.error('Failed to start client', error);

    process.exit(-1);
  });
