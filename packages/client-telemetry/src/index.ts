// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { BlockDb } from '@polkadot/client-db-chain/types';
import { SyncStatus } from '@polkadot/client-p2p/types';
import { Logger } from '@polkadot/util/types';
import { TelemetryInterface } from './types';

import './polyfill';

import logger from '@polkadot/util/logger';

import Base from './messages/Base';
import BlockImport from './messages/BlockImport';
import Connected from './messages/Connected';
import Interval from './messages/Interval';
import Started from './messages/Started';

export default class Telemetry implements TelemetryInterface {
  private l: Logger;
  private blocks: BlockDb;
  private isActive: boolean = false;
  private chain: string;
  private name: string;
  private url: string;
  private websocket: WebSocket | null = null;

  constructor ({ telemetry }: Config, { blocks, chain }: ChainInterface) {
    const name = telemetry.name ? telemetry.name.trim() : '';

    this.l = logger('telemetry');
    this.blocks = blocks;
    this.isActive = !!name.length && !!telemetry.url.length;
    this.chain = chain.name;
    this.name = name;
    this.url = telemetry.url;
  }

  async start () {
    if (!this.isActive) {
      return;
    }

    this.connect();
  }

  private connect () {
    this.l.log(`Connecting to telemetry, url=${this.url}, name=${this.name}`);

    const websocket = new WebSocket(this.url);

    websocket.onclose = () => {
      this.l.debug(() => 'Disconnected from telemetry');

      this.websocket = null;

      setTimeout(() => {
        this.connect();
      }, 5000);
    };

    websocket.onopen = () => {
      this.l.debug(() => 'Connected to telemetry');

      this.websocket = websocket;
      this.sendInitial();
    };
  }

  blockImported (): void {
    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();

    this.send(new BlockImport(bestHash, bestNumber));
  }

  intervalInfo (peers: number, status: SyncStatus): void {
    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();

    this.send(new Interval(bestHash, bestNumber, peers, status));
  }

  private sendInitial () {
    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();

    this.send(new Connected(this.chain, this.name));
    this.send(new Started(bestHash, bestNumber));
  }

  private send (message: Base): void {
    if (!this.websocket) {
      return;
    }

    const json = JSON.stringify(message);

    this.l.debug(() => `Sending ${json}`);
    this.websocket.send(json);
  }
}
