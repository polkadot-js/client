// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import wasmAddTwo from '../../test/wasm/addTwo_wasm';
import wasmImport from '../../test/wasm/import_wasm';
import wasmStart from '../../test/wasm/start_wasm';

import createExports from './exports';
import createMemory from './memory';

describe('exports', (): void => {
  describe('valid modules, defaults', (): void => {
    it('creates instance with defaults', async (): Promise<void> => {
      expect(
        (await createExports(wasmAddTwo)).exports
      ).toBeDefined();
    });
  });

  describe('valid modules, with memory', (): void => {
    it('allows calls into the module', async (): Promise<void> => {
      const instance = (await createExports(
        wasmAddTwo,
        {},
        createMemory(0, 0)
      )).exports;

      expect(
        instance.addTwo(22, 33)
      ).toEqual(55);
    });
  });

  describe('imports', (): void => {
    it('allows imports to be called', async (): Promise<void> => {
      const callback = jest.fn();
      const instance = (await createExports(
        wasmImport,
        { js: { callback } },
        createMemory(0, 0)
      )).exports;

      instance.go(123);

      expect(callback).toHaveBeenCalledWith(123);
    });
  });

  describe('start', (): void => {
    it('allows imports to be called', async (): Promise<void> => {
      const callback = jest.fn();

      await createExports(
        wasmStart,
        { js: { callback } },
        createMemory(0, 0)
      );

      expect(callback).toHaveBeenCalledWith(1337);
    });
  });
});
