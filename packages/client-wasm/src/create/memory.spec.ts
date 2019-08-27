// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isInstanceOf } from '@polkadot/util';

import defaults from '../defaults';
import createMemory from './memory';

describe('createMemory', (): void => {
  let globalWasm: any;
  let constructInstanceSpy: Function;

  beforeEach((): void => {
    globalWasm = (global as any).WebAssembly;
    constructInstanceSpy = jest.fn();

    (global as any).WebAssembly = class {
      public static Memory = class {
        public constructor (defaults: any) {
          constructInstanceSpy(defaults);
        }
      };
    };
  });

  afterEach((): void => {
    (global as any).WebAssembly = globalWasm;
  });

  it('expects initial <= maximum', (): void => {
    expect(
      (): void => {
        createMemory(16, 8);
      }
    ).toThrow(/initial size to be/);
  });

  it('constructs WebAssembly.Memory with defaults', (): void => {
    createMemory();

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: defaults.HEAP_SIZE_KB / 16,
      maximum: defaults.HEAP_SIZE_KB / 16
    });
  });

  it('constructs WebAssembly.Memory with provided values', (): void => {
    createMemory(256, 512);

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 256 / 16,
      maximum: 512 / 16
    });
  });

  it('constructs WebAssembly.Memory with minimum values', (): void => {
    createMemory(0, 0);

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 8,
      maximum: 8
    });
  });

  it('returns a WebAssembly.Memory instance', (): void => {
    expect(
      isInstanceOf(
        createMemory(), WebAssembly.Memory
      )
    ).toEqual(true);
  });
});
