#!/usr/bin/env node
// ISC, Copyright 2017 Jaco Greeff

try {
  require('../index.js'); // production
} catch (error) {
  const alias = ['chains', 'p2p', 'rpc', 'wasm']
    .map((path) => `client-${path}`)
    .reduce((alias, path) => {
      alias[`^@polkadot/${path}(.+)`] = `./packages/${path}/src\\1`;

      return alias;
    }, {});

  require('babel-register')({
    plugins: [
      ['module-resolver', { alias }]
    ]
  });
  require('../src/index.js'); // development
}
