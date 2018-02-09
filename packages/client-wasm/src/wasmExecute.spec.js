// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { loadWasmExt } = require('../test/helpers');
const wasm = require('./wasm');

describe('wasm (runtimes)', () => {
  let instance;
  let config;
  let chain;
  let db;

  beforeEach(() => {
    config = {
      wasm: {}
    };
    chain = {
      params: {
        networkId: 42
      }
    };
    db = {
      pairs: () => []
    };
  });

  describe('polkadot_runtime', () => {
    beforeEach(() => {
      instance = wasm(
        config,
        { chain, db },
        loadWasmExt('polkadot_runtime.wasm')
      );
    });

    it('loads the actual runtime', () => {
      expect(
        instance.execute_block
      ).toBeDefined();
    });

    it('executes a basic block', () => {
      console.log('functions', instance);

      expect(
        instance.execute_block(new Uint8Array([]))
      ).toBeDefined();
    });
  });

  describe.skip('substrate_test_runtime', () => {
    beforeEach(() => {
      instance = wasm(
        config,
        { chain, db },
        loadWasmExt('substrate_test_runtime.wasm')
      );
    });

    it('executes actual runtime tests', () => {
      console.log('functions', instance);

      expect(
        instance.run_tests(new Uint8Array([]))
      ).toBeDefined();
    });
  });
});
