# @polkadot/client

A very early, WIP and POC JavaScript version of a Polkadot network client. It is incomplete and may not evolve to be a full-featured client.

It is split up into a number of internal packages -

- [packages/client](packages/client/) The main JavaScript client
- [packages/client-p2p](packages/client-p2p/) Peer-to-peer server
- [packages/client-rpc](packages/client-rpc/) RPC server

## Contributing

- Make sure you have [Lerna](https://lernajs.io/) installed, `yarn install -g lerna`
- Bootstrap the dependencies, `lerna bootstrap`
- Make any changes in the relevant package, on master merges new versions will be published automatically
