// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Header } from '@polkadot/primitives/header';
import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { ChainInterface, ChainGenesis, ChainJson } from './types';

import path from 'path';
import HashDiskDb from '@polkadot/client-db/Hash/Disk';
import HashMemoryDb from '@polkadot/client-db/Hash/Memory';
import TrieDiskDb from '@polkadot/client-db/Trie/Disk';
import TrieMemoryDb from '@polkadot/client-db/Trie/Memory';
import createBlockDb from '@polkadot/client-db-chain/block';
import createStateDb from '@polkadot/client-db-chain/state';
import createRuntime from '@polkadot/client-runtime/index';
import Executor from '@polkadot/client-wasm/index';
import createBlock from '@polkadot/primitives/create/block';
import decodeBlock from '@polkadot/primitives/codec/block/decode';
import encodeBlock from '@polkadot/primitives/codec/block/encode';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import storage from '@polkadot/storage';
import key from '@polkadot/storage/key';
import assert from '@polkadot/util/assert';
import hexToU8a from '@polkadot/util/hex/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';
import logger from '@polkadot/util/logger';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';
import trieRoot from '@polkadot/trie-hash/root';

import chains from './chains';

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
  // @ts-ignore Ummm....
  readonly genesis: ChainGenesis;
  readonly state: StateDb;

  constructor (config: Config) {
    this.chain = this.load(config.chain);

    const isDisk = config.db && config.db.type === 'disk';
    const withCompact = config.db && config.db.compact;
    const genesisStateRoot = this.calcGenesisStateRoot();
    const dbPath = path.join(config.db.path, 'chains', `${this.chain.id}-${u8aToHex(genesisStateRoot)}`);

    const blockDb = isDisk
      ? new HashDiskDb(path.join(dbPath, 'block'), withCompact)
      : new HashMemoryDb();
    const stateDb = isDisk
      ? new TrieDiskDb(path.join(dbPath, 'state'), withCompact)
      : new TrieMemoryDb();
    const runtime = createRuntime(stateDb);

    this.blocks = createBlockDb(blockDb);
    this.state = createStateDb(stateDb);
    // this.genesis = this.createGenesisBlock();
    this.executor = new Executor(config, this.blocks, this.state, runtime);
  }

  async initialise (): Promise<void> {
    await this.blocks.db.initialise();
    await this.state.db.initialise();

    // @ts-ignore Yes, this is ugly... but we are happy to change it in here
    // just not on external access
    this.genesis = this.initGenesis();

    const bestHash = this.blocks.bestHash.get();
    const bestNumber = this.blocks.bestNumber.get();

    l.log(`${this.chain.name}, #${bestNumber.toString()}, ${u8aToHex(bestHash, 48)}`);
  }

  // TODO We should load chains from json files as well
  private load (name: string): ChainJson {
    const chain = chains[name];

    assert(chain, `Unable to find builtin chain '${name}'`);

    return chain;
  }

  private calcGenesisStateRoot (): Uint8Array {
    const { genesis: { raw } } = this.chain;

    return trieRoot(
      Object.keys(raw).map((key) => ({
        k: hexToU8a(key),
        v: hexToU8a(raw[key])
      }))
    );
  }

  private initGenesis (): ChainGenesis {
    const bestHash = this.blocks.bestHash.get();

    if (!bestHash || !bestHash.length) {
      return this.createGenesis();
    }

    const bestBlock = this.getBlock(bestHash);

    return this.initGenesisFromBest(bestBlock.header);
  }

  private initGenesisFromBest (bestHeader: Header, traverse: boolean = true): ChainGenesis {
    this.state.db.setRoot(bestHeader.stateRoot);

    const genesisHash = this.state.system.blockHashAt.get(0);

    if (!genesisHash || !genesisHash.length) {
      const prevHash = bestHeader.parentHash;
      const prevNumber = bestHeader.number.subn(1);

      if (traverse && prevNumber.gtn(1)) {
        l.log(`Unable to validate stateRoot, moving to block #${prevNumber.toString()}, ${u8aToHex(prevHash, 48)}`);

        this.blocks.bestHash.set(prevHash);
        this.blocks.bestNumber.set(prevNumber);

        return this.initGenesisFromBest(this.getBlock(prevHash).header, false);
      }

      throw new Error('Unable to retrieve genesis hash, aborting');
    }

    const genesisBlock = this.getBlock(genesisHash);

    return {
      ...genesisBlock,
      code: this.getCode()
    };
  }

  private getBlock (headerHash: Uint8Array): BlockResult {
    const block = this.blocks.block.get(headerHash);

    if (!block || !block.length) {
      throw new Error(`Unable to retrieve block ${u8aToHex(headerHash)}`);
    }

    const decoded = decodeBlock(block);

    return {
      block,
      header: decoded.header,
      headerHash
    };
  }

  private getCode (): Uint8Array {
    const code = this.state.db.get(
      key(storage.consensus.public.code)()
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

    return genesis;
  }

  private createGenesisBlock (): ChainGenesis {
    const block = createBlock({
      header: {
        stateRoot: this.state.db.getRoot(),
        extrinsicsRoot: trieRoot([])
      }
    });
    const header = encodeHeader(block.header);
    const headerHash = blake2Asu8a(header, 256);

    return {
      block: encodeBlock(block),
      code: this.getCode(),
      header: block.header,
      headerHash
    };
  }

  private createGenesisState (): void {
    const { genesis: { raw } } = this.chain;

    this.state.db.checkpoint();

    Object.keys(raw).forEach((key) =>
      this.state.db.put(
        hexToU8a(key),
        hexToU8a(raw[key])
      )
    );

    this.state.db.commit();
  }
}
