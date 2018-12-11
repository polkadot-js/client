// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { ChainInterface, ChainGenesis, ChainJson } from './types';

import ChainDbs from '@polkadot/client-db/index';
import createRuntime from '@polkadot/client-runtime/index';
import Executor from '@polkadot/client-wasm/index';
import { Block, Header } from '@polkadot/types';
import storage from '@polkadot/storage/static';
import { assert, compactStripLength, hexToU8a, logger, u8aToHex } from '@polkadot/util';
import { trieRoot } from '@polkadot/trie-hash';

import Loader from './loader';

type BlockResult = {
  block: Uint8Array,
  header: Header,
  headerHash: Uint8Array
};

const l = logger('chain');

export default class Chain implements ChainInterface {
  readonly blocks: BlockDb;
  readonly chain: ChainJson;
  readonly executor: ExecutorInterface;
  readonly genesis: ChainGenesis;
  readonly state: StateDb;

  constructor (config: Config) {
    const chain = new Loader(config);
    const dbs = new ChainDbs(config, chain);

    this.chain = chain.chain;
    this.blocks = dbs.blocks;
    this.state = dbs.state;
    this.genesis = this.initGenesis();

    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();

    l.log(`${this.chain.name}, #${bestNumber.toString()}, ${u8aToHex(bestHash, 48)}`);

    // NOTE Snapshot _before_ we attach the runtime since it ties directly to the backing DBs
    dbs.snapshot();

    const runtime = createRuntime(this.state.db);

    this.executor = new Executor(config, this.blocks, this.state, runtime);
  }

  private initGenesis (): ChainGenesis {
    const bestHash = this.blocks.bestHash.get();

    if (!bestHash || !bestHash.length) {
      return this.createGenesis();
    }

    const bestBlock = this.getBlock(bestHash);

    return this.initGenesisFromBest(bestBlock.header);
  }

  private initGenesisFromBest (bestHeader: Header, rollback: boolean = true): ChainGenesis {
    const hexState = u8aToHex(bestHeader.stateRoot, 48);

    l.debug(`Initialising from state ${hexState}`);

    this.state.db.setRoot(bestHeader.stateRoot);

    assert(u8aToHex(this.state.db.getRoot(), 48) === hexState, `Unable to move state to ${hexState}`);

    const genesisHash = this.blocks.hash.get(0);

    if (!genesisHash || !genesisHash.length) {
      return this.rollbackBlock(bestHeader, rollback);
    }

    const genesisBlock = this.getBlock(genesisHash);

    return {
      ...genesisBlock,
      code: this.getCode()
    };
  }

  private rollbackBlock (bestHeader: Header, rollback: boolean = true): ChainGenesis {
    const prevHash = bestHeader.parentHash;
    const prevNumber = bestHeader.blockNumber.subn(1);

    if (rollback && prevNumber.gtn(1)) {
      l.warn(`Unable to validate root, moving to block #${prevNumber.toString()}, ${u8aToHex(prevHash, 48)}`);

      const prevBlock = this.getBlock(prevHash);

      this.blocks.bestHash.set(prevHash);
      this.blocks.bestNumber.set(prevBlock.header.blockNumber);

      return this.initGenesisFromBest(prevBlock.header, false);
    }

    throw new Error('Unable to retrieve genesis hash, aborting');
  }

  private getBlock (headerHash: Uint8Array): BlockResult {
    const block = this.blocks.block.get(headerHash);

    if (!block || !block.length) {
      throw new Error(`Unable to retrieve block ${u8aToHex(headerHash)}`);
    }

    return {
      block,
      header: new Block(block).header,
      headerHash
    };
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

  private createGenesis (): ChainGenesis {
    this.createGenesisState();

    const genesis = this.createGenesisBlock();

    this.blocks.bestHash.set(genesis.headerHash);
    this.blocks.bestNumber.set(0);
    this.blocks.block.set(genesis.block, genesis.headerHash);
    this.blocks.hash.set(genesis.headerHash, 0);

    return genesis;
  }

  private createGenesisBlock (): ChainGenesis {
    const block = new Block({
      header: {
        stateRoot: this.state.db.getRoot(),
        extrinsicsRoot: trieRoot([]),
        parentHash: new Uint8Array(32)
      }
    });
    const headerHash = block.header.hash;

    return {
      block: block.toU8a(),
      code: this.getCode(),
      header: block.header,
      headerHash
    };
  }

  private createGenesisState (): void {
    const { genesis: { raw } } = this.chain;

    this.state.db.transaction((): boolean => {
      Object
        .keys(raw)
        .forEach((key) =>
          this.state.db.put(
            hexToU8a(key),
            hexToU8a(raw[key])
          )
        );

      return true;
    });
  }
}
