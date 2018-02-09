// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { loadWasmExt } = require('../test/helpers');
const wasm = require('./wasm');

describe('wasm (polkadot-runtime)', () => {
  let instance;

  beforeEach(() => {
    const config = {
      wasm: {}
    };
    const chain = {
      params: {
        networkId: 42
      }
    };
    const db = {
      pairs: () => []
    };

    instance = wasm(
      config,
      { chain, db },
      loadWasmExt('polkadot_runtime.wasm')
    );
  });

  it('loads the actual runtime', () => {
    expect(
      instance.execute_transaction
    ).toBeDefined();
  });

  it('executes actual runtime tests', () => {
    console.log('instance.run_tests', instance.run_tests, typeof instance.run_tests);

    expect(
      instance.run_tests(new Uint8Array([]))
    ).toBeDefined();
  });
});
