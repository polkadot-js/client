![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)

# @polkadot/client

A very early, WIP and POC JavaScript version of a simplified Polkadot network client. It is incomplete and may not evolve to be a full-featured client.

It is split up into a number of internal packages -

- [packages/client](packages/client/) The main JavaScript client
- [packages/client-p2p](packages/client-p2p/) Peer-to-peer server
- [packages/client-rpc](packages/client-rpc/) RPC server
- [packages/client-wasm](packages/client-wasm/) Wasm interface wrapper

## Local development node

Start the node with `yarn start <options>`. At the time of this writing, the available options are

  Operation
    --chain  Use the chain specified, one of 'nelson' or custom '<chain>.json'
                                           [string] [required] [default: "nelson"]
    --role   Sets the type of role the node operates as
                [string] [required] [choices: "none", "full", "light", "collator",
                                                    "validator"] [default: "none"]

  Peer-to-peer
    --p2p-address    The interface to bind to (p2p-port > 0)
                                                   [string] [default: "127.0.0.1"]
    --p2p-max-peers  The maximum allowed peers              [number] [default: 25]
    --p2p-port       Sets the peer-to-peer port, 0 for non-listening mode
                                                       [number] [default: 30903]

  RPC server
    --rpc-path  Sets the endpoint for RPC POST requests    [string] [default: "/"]
    --rpc-port  Sets the port to use for local RPC        [number] [default: 9933]
    --rpc-type  Sets the available RPC protocol types
                          [array] [choices: "http", "ws"] [default: ["http","ws"]]

  Options:
    --help     Show help                                                 [boolean]
    --version  Show version number                                       [boolean]

## Contributing

- Make sure you have [Lerna](https://lernajs.io/) installed, `yarn install -g lerna`
- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically
