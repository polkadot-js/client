#!/usr/bin/env node
// ISC, Copyright 2017 Jaco Greeff

try {
  // $FlowFixMe production version
  require('../index.js');
} catch (error) {
  require('babel-register')({
    plugins: [
      ['module-resolver', {
        alias: {
          '^@polkadot/client-(chains|db|p2p|rpc|state|wasm-runtime|wasm)(.*)': './packages/client-\\1/src\\2'
        }
      }]
    ]
  });
  require('../src/index.js');
}
