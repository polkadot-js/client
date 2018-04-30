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
          '^@polkadot/client-(chains|db-chain|db|p2p|rpc|runtime|state|wasm)(.*)': './packages/client-\\1/src\\2',
          '^@polkadot/storage-(polkadot|substrate)(.*)': './packages/storage-\\1/src\\2',
          '^@polkadot/storage(.*)': './packages/storage\\1/src\\2'
        }
      }]
    ]
  });
  require('../src/index.js');
}
