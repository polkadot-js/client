// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { ExecutorInterface } from './types';

import { BlockData, ImportBlock } from '@polkadot/client-types/index';
import storage from '@polkadot/storage/static';
import { assert, compactStripLength, logger, u8aToHex } from '@polkadot/util';

import createWasm from './create';
import proxy from './wasm/proxy_substrate_wasm';

type CallResult = {
  bool: boolean,
  lo: number,
  hi: number
};

type Call = (...data: Array<Uint8Array>) => CallResult;

// type CallU8a = (...data: Array<Uint8Array>) => Uint8Array;

const [, CODE_KEY] = compactStripLength(storage.substrate.code());

const l = logger('executor');

export default class Executor implements ExecutorInterface {
  private blockDb: BlockDb;
  private config: Config;
  private runtime: RuntimeInterface;
  private stateDb: StateDb;

  constructor (config: Config, blockDb: BlockDb, stateDb: StateDb, runtime: RuntimeInterface) {
    this.blockDb = blockDb;
    this.config = config;
    this.stateDb = stateDb;
    this.runtime = runtime;
  }

  private executeBlock (block: BlockData, forceNew: boolean = false): boolean {
    const start = Date.now();

    l.debug(() => 'Executing block');

    const u8a = new ImportBlock(block).toU8a();
    console.error(u8a.toString());
    const result = this.call('Core_execute_block', forceNew)(u8a);

    l.debug(() => `Block execution completed (${Date.now() - start}ms)`);

    return result.bool;
  }

  importBlock (block: BlockData): boolean {
    const start = Date.now();
    const header = block.header.unwrap();
    const headerHash = header.hash;

    // 62, 102, 211, 177, 122, 49, 110, 207, 155, 243, 252, 53, 228, 19, 21, 0, 209, 219, 180, 29, 227, 238, 33,
    // 15, 122, 104, 10, 44, 83, 39, 180, 144, 4, 165, 63, 182, 242, 46, 83, 94, 129, 193, 104, 207, 169, 10, 100,
    // 172, 224, 158, 32, 158, 94, 145, 170, 162, 212, 1, 223, 219, 57, 41, 170, 83, 176, 73, 36, 49, 74, 96, 216,
    // 240, 182, 215, 11, 21, 75, 127, 86, 119, 167, 216, 199, 44, 6, 116, 85, 172, 34, 28, 26, 55, 87, 167, 146,
    // 207, 165, 4, 3, 14, 138, 4,23,0,0,0,0,114,164,0,172,94,244,36,192,63,73,22,78,186,48,145,235,233,95,192,50,123,230,169,4,56,56,145,169,54,14,26,42,114,51,58,135,52,206,47,54,8,172,46,84,133,221,173,36,217,249,83,229,21,195,54,139,122,12,231,239,58,77,40,14,4,32,1,0,0,3,56,40,18,92

    // 62, 102, 211, 177, 122, 49, 110, 207, 155, 243, 252, 53, 228, 19, 21, 0, 209, 219, 180, 29, 227, 238, 33,
    // 15, 122, 104, 10, 44, 83, 39, 180, 144, 4, 165, 63, 182, 242, 46, 83, 94, 129, 193, 104, 207, 169, 10, 100,
    // 172, 224, 158, 32, 158, 94, 145, 170, 162, 212, 1, 223, 219, 57, 41, 170, 83, 176, 73, 36, 49, 74, 96, 216,
    // 240, 182, 215, 11, 21, 75, 127, 86, 119, 167, 216, 199, 44, 6, 116, 85, 172, 34, 28, 26, 55, 87, 167, 146,
    // 207, 165, 0, 4, 32, 1, 0, 0, 3, 56, 40, 18, 92]

    l.debug(() => `Importing block #${header.blockNumber}, ${u8aToHex(headerHash, 48)}`);

    try {
      this.stateDb.db.transaction(() =>
        this.executeBlock(block)
      );
    } catch (error) {
      l.error(`Failed importing #${header.blockNumber.toString()}, ${u8aToHex(headerHash, 48)}`);

      throw error;
    }

    this.blockDb.bestHash.set(headerHash);
    this.blockDb.bestNumber.set(header.blockNumber);
    this.blockDb.block.set(block.toU8a(), headerHash);
    this.blockDb.hash.set(headerHash, header.blockNumber);

    l.debug(() => `Imported block #${header.blockNumber} (${Date.now() - start}ms)`);

    return false;
  }

  private call (name: string, forceNew: boolean = false): Call {
    const code = this.stateDb.db.get(CODE_KEY);

    assert(code, 'Expected to have code available in runtime');

    // @ts-ignore code check above
    const instance = createWasm({ config: this.config, l }, this.runtime, code, proxy, forceNew);
    const { heap } = this.runtime.environment;

    return (...data: Array<Uint8Array>): CallResult => {
      const start = Date.now();

      l.debug(() => ['preparing', name]);
      // runtime.instrument.start();

      const params = data.reduce((params, data) => {
        l.debug(() => ['storing', u8aToHex(data)]);

        params.push(heap.set(heap.allocate(data.length), data));
        params.push(data.length);

        return params;
      }, ([] as number[]));

      l.debug(() => ['executing', name, params]);

      const lo: number = instance[name].apply(null, params);
      const hi: number = instance['get_result_hi']();

      // l.debug(() => runtime.instrument.stop());
      l.debug(() => [name, 'returned', [lo, hi], `(${Date.now() - start}ms)`]);

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

  //   return (...data: Array<Uint8Array>): Uint8Array => {
  //     const { hi, lo } = fn.apply(null, data);
  //     const result = heap.get(lo, hi).slice();

  //     l.debug(() => ['received', u8aToHex(result)]);

  //     return result;
  //   };
  // }
}
