#!/usr/bin/env node
// ISC, Copyright 2017 Jaco Greeff

try {
  require('../index.js'); // production
} catch (error) {
  require('babel-register')({
    plugins: [
      ['module-resolver', {
        alias: {
          '^@polkadot/client-(chains|p2p|rpc|wasm)(.+)': './packages/client-\\1/src\\2',
          '^@polkadot/client-(chains|p2p|rpc|wasm)': './packages/client-\\1/src'
        }
      }]
    ]
  });
  require('../src/index.js'); // development
}
