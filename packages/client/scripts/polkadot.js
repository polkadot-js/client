#!/usr/bin/env node
// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

try {
  require('../index.js');
} catch (error) {
  require('@babel/register')({
    plugins: [
      ['module-resolver', {
        alias: {
          '^@polkadot/client-(chains|db-chain|db|p2p|rpc|runtime|wasm)(.*)': './packages/client-\\1/src\\2'
        }
      }]
    ]
  });
  require('../src/index.js');
}
