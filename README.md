[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.com/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square)](https://david-dm.org/polkadot-js/client)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square)](https://david-dm.org/polkadot-js/client#info=devDependencies)

# @polkadot/client

A JavaScript version of a Polkadot/Substrate network client. It allows operation in full and light nodes fullfilling all functions of chain operation, however does not include the ability to author blocks (i.e. run as a validator on the network).

## Current status

As of 0.19.1, this is the current status of the client -

- It can sync and operate on Polkadot POC-3 networks, and has been tested against Dried Danta (Substrate). Alexander (Polkadot) support is up next once the network stabilises.
- It currently does not include much (if any) of the RPC interfaces - so it is not (currently) able to support eg. the apps UI connecting to it
- It does not (currently) do any state and trie pruning, so the resulting backing database growth is not controlled
- As of 0.19.1 the backing database has been swapped to LmDB, this interface is much faster than the previous implementation, however uses more disk space (follow-up from the previous point). Investigations are still ongoing as to the best fit for the backend DB engine.

## Development overview

It is split up into a number of internal packages -

- [client](packages/client/) The main JavaScript client
- [client-chains](packages/client-chains/) Chain definitions
- [client-db](packages/client-db/) Database interface
- [client-p2p](packages/client-p2p/) Peer-to-peer server
- [client-rpc](packages/client-rpc/) RPC server
- [client-runtime](packages/client-runtime/) Basic Wasm runtime wrapper
- [client-telemetry](packages/client-telemetry/) Substrate telemetry interface
- [client-types](packages/client-types/) Specific codec types for client interfaces
- [client-wasm](packages/client-wasm/) Wasm interface wrapper

## Local development node

Start the node with `yarn run start <options>`, e.g. `yarn run start --chain dried-danta`. You can use `--help` to get a list of the available options.

## Contributing

- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically
