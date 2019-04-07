// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config, ConfigPartial } from './types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { P2pInterface } from '@polkadot/client-p2p/types';
import { RpcInterface } from '@polkadot/client-rpc/types';
import { SignalInterface } from '@polkadot/client-signal/types';
import { SyncTypes } from '@polkadot/client-sync/types';
import { TelemetryInterface } from '@polkadot/client-telemetry/types';

import './license';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import Chain from '@polkadot/client-chains';
import P2p from '@polkadot/client-p2p';
import Rpc from '@polkadot/client-rpc';
import WebRTCSignal from '@polkadot/client-signal/server';
import Telemetry from '@polkadot/client-telemetry';
import { logger, formatNumber, isUndefined, u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import * as clientId from './clientId';
import defaults from './defaults';

const l = logger('client');

export default class Client extends EventEmitter {
  private chain?: ChainInterface;
  private informantId?: NodeJS.Timer;
  private p2p?: P2pInterface;
  private rpc?: RpcInterface;
  private signal?: SignalInterface;
  private sync: SyncTypes = 'light';
  private telemetry?: TelemetryInterface;
  private prevBest?: BN;
  private prevTime: number = Date.now();
  private prevImport: number = 0;

  async start (config: ConfigPartial) {
    await cryptoWaitReady();

    const verStatus = await clientId.getNpmStatus();
    const status = verStatus
      ? `(${verStatus})`
      : '';

    this.sync = config.sync;

    l.log(`Running version ${clientId.version} ${status}`);
    l.log(`Initialising for ${this.sync} sync on chain ${config.chain}`);

    this.chain = new Chain(config as Config);

    if (config.p2p && config.p2p.active && config.p2p.port) {
      this.p2p = new P2p(config as Config, this.chain);
    }

    if (config.rpc && config.rpc.active && config.rpc.port) {
      this.rpc = new Rpc(config as Config, this.chain);
    }

    if (config.signal && config.signal.active && config.signal.port) {
      this.signal = new WebRTCSignal(config as Config);
    }

    if (config.telemetry) {
      this.telemetry = new Telemetry(config as Config, this.chain);
    }

    await this.startServices();
  }

  private async startServices () {
    if (this.p2p) {
      await this.p2p.start();
    }

    if (this.rpc) {
      await this.rpc.start();
    }

    if (this.signal) {
      await this.signal.start();
    }

    if (this.telemetry) {
      await this.telemetry.start();
    }

    this.startInformant();
  }

  async stop (): Promise<boolean> {
    l.log('Shutting down client');

    this.stopInformant();

    if (this.p2p) {
      await this.p2p.stop();
    }

    if (this.rpc) {
      await this.rpc.stop();
    }

    if (this.signal) {
      await this.signal.stop();
    }

    if (this.telemetry) {
      await this.telemetry.stop();
    }

    if (this.chain) {
      this.chain.stop();
    }

    return true;
  }

  private startInformant () {
    this.informantId = setInterval(this.runInformant, defaults.INFORMANT_DELAY);

    if (isUndefined(this.p2p)) {
      return;
    }

    this.p2p.sync.on('imported', () => {
      if (!isUndefined(this.chain)) {
        const bestNumber = this.chain.blocks.bestNumber.get();

        this.emit('imported', {
          bestNumber: bestNumber.toString()
        });
      }

      if (!isUndefined(this.telemetry)) {
        const now = Date.now();

        if ((now - this.prevImport) >= defaults.IMPORT_INTERVAL) {
          this.prevImport = now;
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
    if (isUndefined(this.chain) || isUndefined(this.p2p)) {
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
    const blockType = this.sync === 'full' ? 'block' : 'header';
    const newSpeed = isSync
      ? ` (${(elapsed / numBlocks.toNumber()).toFixed(0)} ms/${blockType})`
      : '';
    const newBlocks = hasBlocks && this.prevBest
      ? `, +${formatNumber(numBlocks)} ${blockType}s${newSpeed}`
      : '';
    const target = isSync
      ? `, target #${formatNumber(this.p2p.sync.bestSeen)}`
      : '';

    l.log(`${status} (${numPeers} peers), current #${formatNumber(bestNumber)}${target}, ${u8aToHex(bestHash, 48)}${newBlocks}`);

    this.emit('informant', {
      bestNumber: bestNumber.toString(),
      numPeers,
      status
    });

    this.prevBest = bestNumber;
    this.prevTime = now;
    this.prevImport = now;

    if (!isUndefined(this.telemetry)) {
      this.telemetry.intervalInfo(numPeers, status);
    }
  }
}
