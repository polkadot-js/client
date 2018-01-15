#!/usr/bin/env node
// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

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
