// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { ExecutorInterface, WasmInstanceExports } from './types';

import storage from '@polkadot/api-metadata/storage/static';
import { BlockData, ImportBlock } from '@polkadot/client-types';
import { assert, compactStripLength, logger, u8aToHex } from '@polkadot/util';

import createWasm from './create';
import proxy from './wasm/proxy_substrate_wasm';

interface CallResult {
  bool: boolean;
  lo: number;
  hi: number;
}

type Call = (...data: Uint8Array[]) => CallResult;
// type CallU8a = (...data: Uint8Array[]) => Uint8Array;

const [, CODE_KEY] = compactStripLength(storage.substrate.code());

const l = logger('executor');

export default class Executor implements ExecutorInterface {
  private blockDb: BlockDb;

  private config: Config;

  private runtime: RuntimeInterface;

  private stateDb: StateDb;

  public constructor (config: Config, blockDb: BlockDb, stateDb: StateDb, runtime: RuntimeInterface) {
    this.blockDb = blockDb;
    this.config = config;
    this.stateDb = stateDb;
    this.runtime = runtime;
  }

  private createWasm (forceNew: boolean = false): Promise<WasmInstanceExports> {
    const code = this.stateDb.db.get(CODE_KEY);

    assert(code, 'Expected to have code available in runtime');

    // @ts-ignore code check above
    return createWasm({ config: this.config, l }, this.runtime, code, proxy, forceNew);
  }

  private executeBlock (wasm: WasmInstanceExports, blockData: BlockData): boolean {
    const start = Date.now();

    l.debug((): string => 'Executing block');

    const u8a = new ImportBlock(blockData).toU8a();
    const fn = this.call(wasm, 'Core_execute_block');
    const result = fn(u8a);

    l.debug((): string => `Block execution completed (${Date.now() - start}ms)`);

    return result.bool;
  }

  private updateBlockDb (blockData: BlockData): boolean {
    const { hash } = blockData.header;
    const blockNumber = blockData.header.number.unwrap();
    const bestNumber = this.blockDb.bestNumber.get();

    return this.blockDb.db.transaction((): boolean => {
      // only set the best number when higher that what we have
      if (bestNumber.lt(blockNumber)) {
        this.blockDb.bestHash.set(hash);
        this.blockDb.bestNumber.set(blockNumber);
      }

      // FIXME This could be problematic, i.e. the hash <-> number mappings (multiples)
      this.blockDb.blockData.set(blockData.toU8a(), hash);
      this.blockDb.hash.set(hash, blockNumber);

      return true;
    });
  }

  public async importBlock (blockData: BlockData): Promise<boolean> {
    const start = Date.now();
    const { parentHash } = blockData.header;
    const blockNumber = blockData.header.number.unwrap();

    l.debug((): string => `Importing block #${blockNumber}, ${u8aToHex(blockData.header.hash, 48)}`);

    try {
      // get the parent block, set the root accordingly
      const { header: { stateRoot } } = new BlockData(this.blockDb.blockData.get(parentHash));

      if (!stateRoot.eq(this.stateDb.getRoot())) {
        this.stateDb.setRoot(stateRoot);
      }

      const wasm = await this.createWasm();

      // execute the block against this root
      this.stateDb.db.transaction((): boolean =>
        this.executeBlock(wasm, blockData)
      );
    } catch (error) {
      l.error(`Failed importing #${blockNumber}, ${u8aToHex(blockData.header.hash, 48)}`, JSON.stringify(blockData.toJSON()));
      l.error(error);

      throw error;
    }

    const result = this.updateBlockDb(blockData);

    if (result) {
      this.stateDb.snapshot(blockNumber);

      l.debug((): string => `Imported block #${blockNumber} (${Date.now() - start}ms)`);
    }

    return result;
  }

  public async importHeader (blockData: BlockData): Promise<boolean> {
    const start = Date.now();
    const blockNumber = blockData.header.number.unwrap();

    l.debug((): string => `Importing block #${blockNumber}, ${u8aToHex(blockData.header.hash, 48)}`);

    const result = this.updateBlockDb(blockData);

    if (result) {
      l.debug((): string => `Imported header #${blockNumber} (${Date.now() - start}ms)`);
    }

    return result;
  }

  private call (wasm: WasmInstanceExports, name: string): Call {
    const { heap } = this.runtime.environment;

    return (...data: Uint8Array[]): CallResult => {
      const start = Date.now();

      l.debug((): any[] => ['preparing', name]);
      // runtime.instrument.start();

      const params = data.reduce((params: number[], data): number[] => {
        l.debug((): any[] => ['storing', u8aToHex(data)]);

        params.push(heap.set(heap.allocate(data.length), data));
        params.push(data.length);

        return params;
      }, []);

      l.debug((): any[] => ['executing', name, params]);

      const lo: number = wasm[name].apply(null, params);
      const hi: number = wasm.get_result_hi();

      // l.debug(() => runtime.instrument.stop());
      l.debug((): any[] => [name, 'returned', [lo, hi], `(${Date.now() - start}ms)`]);

      return {
        bool: hi === 0 && lo === 1,
        hi,
        lo
      };
    };
  }

  // private callAsU8a (name: string): CallU8a {
  //   const fn = this.call(name);
  //   const { heap } = this.runtime.environment;

  //   return (...data: Uint8Array[]): Uint8Array => {
  //     const { hi, lo } = fn.apply(null, data);
  //     const result = heap.get(lo, hi).slice();

  //     l.debug(() => ['received', u8aToHex(result)]);

  //     return result;
  //   };
  // }
}
