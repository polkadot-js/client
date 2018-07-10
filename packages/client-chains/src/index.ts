// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BaseDb, TrieDb } from '@polkadot/client-db/types';
import { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { ChainInterface, ChainGenesis, ChainGenesisState } from './types';

import createBlockDb from '@polkadot/client-db-chain/block';
import createStateDb from '@polkadot/client-db-chain/state';
import createRuntime from '@polkadot/client-runtime/index';
import createExecutor from '@polkadot/client-wasm/index';
import createBlock from '@polkadot/primitives/create/block';
import encodeBlock from '@polkadot/primitives/codec/block/encode';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import storage from '@polkadot/storage';
import key from '@polkadot/storage/key';
import assert from '@polkadot/util/assert';
import hexToU8a from '@polkadot/util/hex/toU8a';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';
import trieRoot from '@polkadot/trie-hash/root';

import chains from './chains';

export default class Chain implements ChainInterface {
  readonly blocks: BlockDb;
  readonly executor: ExecutorInterface;
  readonly genesis: ChainGenesis;
  readonly state: StateDb;

  constructor (config: Config, stateDb: TrieDb, blockDb: BaseDb) {
    const initial = this.load(config.chain);
    const runtime = createRuntime(stateDb);

    this.blocks = createBlockDb(blockDb);
    this.state = createStateDb(stateDb);
    this.genesis = this.initGenesis(initial);
    this.executor = createExecutor(config, this.blocks, this.state, runtime, this.genesis);
  }

  // TODO We should load chains from json files as well
  private load (name: string): ChainGenesisState {
    const chain = chains[name];

    assert(chain, `Unable to find builtin chain '${name}'`);

    return chain;
  }

  private initGenesis (initial: ChainGenesisState) {
    this.initGenesisState(initial);

    const genesis = this.initGenesisBlock();

    this.blocks.bestHash.set(genesis.headerHash);
    this.blocks.bestNumber.set(0);
    this.blocks.block.set(genesis.block, genesis.headerHash);

    return genesis;
  }

  private initGenesisBlock () {
    const code = this.state.db.get(
      key(storage.consensus.public.code)()
    );

    if (code === null) {
      throw new Error('Unable to retrieve genesis code');
    }

    const block = createBlock({
      header: {
        stateRoot: this.state.db.trieRoot(),
        extrinsicsRoot: trieRoot([])
      }
    });
    const header = encodeHeader(block.header);
    const headerHash = blake2Asu8a(header, 256);

    return {
      block: encodeBlock(block),
      code,
      header: block.header,
      headerHash
    };
  }

  private initGenesisState (initial: ChainGenesisState) {
    this.state.db.checkpoint();

    Object.keys(initial).forEach((key) =>
      this.state.db.put(
        hexToU8a(key),
        hexToU8a(initial[key])
      )
    );

    this.state.db.commit();
  }
}
