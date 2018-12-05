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

A very early, WIP and POC JavaScript version of a simplified Polkadot network client. It is incomplete and may not evolve to be a full-featured client.

It is split up into a number of internal packages -

- [client](packages/client/) The main JavaScript client
- [client-chains](packages/client-chains/) Chain definitions
- [client-db](packages/client-db/) Database interface
- [client-p2p](packages/client-p2p/) Peer-to-peer server
- [client-rpc](packages/client-rpc/) RPC server
- [client-runtime](packages/client-runtime/) Basic Wasm runtime wrapper
- [client-wasm](packages/client-wasm/) Wasm interface wrapper

## Local development node

Start the node with `yarn run start <options>`. User `--help` to get a list of available options.

It is possible to start 2 servers (testing connections between), by opening 2 terminals, starting normally in the first and in the second running `yarn run start2`.

The above is (currently) equivalent to offsetting the ports by 1 and adding the first as a peer. The equivalent command would be -

```
$ yarn run start --p2p-peers=/ip4/127.0.0.1/tcp/39933 --p2p-port=39934 --rpc-port=9934 --db-path=./tmp
```

## Contributing

- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically
