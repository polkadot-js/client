// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from './types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { P2pInterface } from '@polkadot/client-p2p/types';
import { RpcInterface } from '@polkadot/client-rpc/types';
import { Logger } from '@polkadot/util/types';

import './license';

import createChain from '@polkadot/client-chains/index';
import createP2p from '@polkadot/client-p2p/index';
import telemetry from '@polkadot/client-telemetry/index';
import logger from '@polkadot/util/logger';
import HashDb from '@polkadot/client-db/Hash';
import MemoryDb from '@polkadot/client-db/Memory';
import isUndefined from '@polkadot/util/is/undefined';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Rpc from '@polkadot/client-rpc/index';
import * as clientId from './clientId';
import defaults from './defaults';
import cli from './cli';

class Client {
  private l: Logger;
  private chain?: ChainInterface;
  private p2p?: P2pInterface;
  private rpc?: RpcInterface;
  private informantId?: NodeJS.Timer;

  constructor () {
    this.l = logger('client');
  }

  async start (config: Config) {
    const verStatus = await clientId.getNpmStatus();

    this.l.log(`Running version ${clientId.version} (${verStatus})`);
    this.l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

    this.chain = createChain(config, new MemoryDb(), new HashDb());
    this.p2p = createP2p(config, this.chain);
    this.rpc = new Rpc(config, this.chain);

    telemetry.init(config, this.chain);

    await this.rpc.start();

    this.startInformant();
  }

  stop () {
    this.stopInformant();

    // TODO We need to destroy/stop the p2p, rpc, etc interfaces created in the start()
    // here as well.
  }

  private startInformant () {
    this.informantId = setInterval(this.runInformant, defaults.INFORMANT_DELAY);
  }

  private stopInformant () {
    if (!isUndefined(this.informantId)) {
      clearInterval(this.informantId);
    }

    this.informantId = undefined;
  }

  private runInformant = (): void => {
    if (isUndefined(this.chain) || isUndefined(this.p2p) || isUndefined(this.rpc)) {
      this.stopInformant();

      return;
    }

    const numPeers = this.p2p.getNumPeers();
    const status = this.p2p.getSyncStatus();
    const bestHash = this.chain.blocks.bestHash.get();
    const bestNumber = this.chain.blocks.bestNumber.get();

    this.l.log(`${status} (${numPeers} peers), #${bestNumber.toNumber()}, ${u8aToHex(bestHash, 48)}`);

    telemetry.intervalInfo(numPeers, status);
  }
}

new Client()
  .start(cli())
  .catch((error) => {
    console.error('Failed to start client', error);
  });
