[![npm (scoped)](https://img.shields.io/npm/v/@polkadot/client.svg)](https://www.npmjs.com/package/@polkadot/client)
[![Build Status](https://travis-ci.org/polkadot-js/client.svg?branch=master)](https://travis-ci.org/polkadot-js/client)
[![Coverage Status](https://coveralls.io/repos/github/polkadot-js/client/badge.svg?branch=master)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/polkadot-js/client.svg)](https://greenkeeper.io/)

# @polkadot/client

A very early, WIP and POC JavaScript version of a simplified Polkadot network client. It is incomplete and may not evolve to be a full-featured client.

It is split up into a number of internal packages -

- [packages/client](packages/client/) The main JavaScript client
- [packages/client-p2p](packages/client-p2p/) Peer-to-peer server
- [packages/client-rpc](packages/client-rpc/) RPC server
- [packages/client-types](packages/client-types/) Network type definitions
- [packages/client-wasm](packages/client-rpc/) Wasm interface wrapper

## Contributing

- Make sure you have [Lerna](https://lernajs.io/) installed, `yarn install -g lerna`
- Install the wrapper dependencies, `yarn install`
- Bootstrap the dependencies, `lerna bootstrap --hoist`
- Make any changes in the relevant package, on master merges new versions will be published automatically
