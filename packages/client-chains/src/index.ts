// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';
import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { ChainInterface, ChainGenesis } from './types';

import ChainDbs from '@polkadot/client-db';
import createRuntime from '@polkadot/client-runtime';
import { BlockData } from '@polkadot/client-types';
import Executor from '@polkadot/client-wasm';
import { Header } from '@polkadot/types';
import storage from '@polkadot/storage/static';
import { assert, compactStripLength, formatNumber, hexToU8a, logger, u8aToHex } from '@polkadot/util';
import { trieRoot } from '@polkadot/trie-hash';

import Loader from './loader';

const l = logger('chain');

export default class Chain implements ChainInterface {
  readonly blocks: BlockDb;
  readonly chain: Chainspec;
  readonly executor: ExecutorInterface;
  readonly genesis: ChainGenesis;
  readonly state: StateDb;
  private config: Config;
  private dbs: ChainDbs;

  constructor (config: Config) {
    const chain = new Loader(config);

    this.config = config;
    this.dbs = new ChainDbs(config, chain);
    this.chain = chain.chain;
    this.blocks = this.dbs.blocks;
    this.state = this.dbs.state;
    this.genesis = this.initGenesis();

    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();
    const logGenesis = bestNumber.isZero()
      ? ''
      : `(genesis ${u8aToHex(this.genesis.block.hash, 48)})`;

    l.log(`${this.chain.name}, #${formatNumber(bestNumber)}, ${u8aToHex(bestHash, 48)} ${logGenesis}`);

    const runtime = createRuntime(this.state);

    this.executor = new Executor(config, this.blocks, this.state, runtime);
  }

  stop () {
    this.dbs.close();
  }

  private initGenesis (): ChainGenesis {
    const bestHash = this.blocks.bestHash.get();
    const hasBest = !!bestHash && !!bestHash.length;

    if (!hasBest || this.config.sync === 'light') {
      return this.createGenesis(!hasBest);
    }

    const bestBlock = this.getBlock(bestHash);

    return this.initGenesisFromBest(bestBlock.header);
    // return this.rollbackBlock(bestBlock.header, true, false);
  }

  private initGenesisFromBest (bestHeader: Header, rollback: boolean = true): ChainGenesis {
    const hexState = u8aToHex(bestHeader.stateRoot, 48);

    l.debug(`Initialising from state ${hexState}`);

    this.state.setRoot(bestHeader.stateRoot);

    assert(u8aToHex(this.state.db.getRoot(), 48) === hexState, `Unable to move state to ${hexState}`);

    const genesisHash = this.blocks.hash.get(0);

    if (!genesisHash || !genesisHash.length) {
      return this.rollbackBlock(bestHeader, rollback);
    }

    const genesisBlock = this.getBlock(genesisHash);

    return {
      block: genesisBlock,
      code: this.getCode()
    };
  }

  private rollbackBlock (bestHeader: Header, rollback: boolean, isLogging: boolean = true): ChainGenesis {
    const prevHash = bestHeader.parentHash;
    const prevNumber = bestHeader.blockNumber.subn(1);

    if (rollback && prevNumber.gtn(1)) {
      if (isLogging) {
        l.warn(`Unable to validate root, moving to block #${prevNumber.toString()}, ${u8aToHex(prevHash, 48)}`);
      }

      const prevBlock = this.getBlock(prevHash);

      this.blocks.db.transaction(() => {
        this.blocks.bestHash.set(prevHash);
        this.blocks.bestNumber.set(prevBlock.header.blockNumber);

        return true;
      });

      return this.initGenesisFromBest(prevBlock.header, false);
    }

    throw new Error('Unable to retrieve genesis hash, aborting');
  }

  private getBlock (headerHash: Uint8Array): BlockData {
    const data = this.blocks.blockData.get(headerHash);

    if (!data || !data.length) {
      throw new Error(`Unable to retrieve block ${u8aToHex(headerHash)}`);
    }

    return new BlockData(data);
  }

  private getCode (): Uint8Array {
    const code = this.state.db.get(
      compactStripLength(storage.substrate.code())[1]
    );

    if (!code || !code.length) {
      throw new Error('Unable to retrieve genesis code');
    }

    return code;
  }

  private createGenesis (setBest: boolean): ChainGenesis {
    this.createGenesisState();

    const genesis = this.createGenesisBlock();

    if (setBest) {
      this.blocks.db.transaction(() => {
        this.blocks.bestHash.set(genesis.block.hash);
        this.blocks.bestNumber.set(0);
        this.blocks.blockData.set(genesis.block.toU8a(), genesis.block.hash);
        this.blocks.hash.set(genesis.block.hash, 0);

        return true;
      });
    }

    return genesis;
  }

  private createGenesisBlock (): ChainGenesis {
    const header = new Header({
      stateRoot: this.state.db.getRoot(),
      extrinsicsRoot: trieRoot([]),
      parentHash: new Uint8Array(32)
    });
    const block = new BlockData({
      hash: header.hash,
      header
    });

    return {
      block,
      code: this.getCode()
    };
  }

  private createGenesisState (): void {
    const { genesis: { raw } } = this.chain;

    this.state.db.transaction((): boolean => {
      Object.entries(raw).forEach(([key, value]) =>
        this.state.db.put(
          hexToU8a(key),
          hexToU8a(value)
        )
      );

      return true;
    });
  }
}
