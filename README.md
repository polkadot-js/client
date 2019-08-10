[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange?style=for-the-badge)](https://polkadot.js.org)
![license](https://img.shields.io/badge/License-Apache%202.0-blue?label=&logo=apache&style=for-the-badge)
[![npm](https://img.shields.io/npm/v/@polkadot/client?label=&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@polkadot/client)
[![beta](https://img.shields.io/npm/v/@polkadot/client/beta?label=&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@polkadot/client)
[![travisci](https://img.shields.io/travis/com/polkadot-js/client?label=&logo=travis&style=for-the-badge)](https://travis-ci.com/polkadot-js/client)
[![circleci](https://img.shields.io/circleci/build/github/polkadot-js/client/master?label=&logo=circleci&style=for-the-badge)](https://circleci.com/gh/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client?label=&logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client?label=&logo=code-climate&style=for-the-badge)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen?label=&logo=greenkeeper&style=for-the-badge)](https://greenkeeper.io/)

# @polkadot/client

A JavaScript version of a Polkadot/Substrate network client. It allows operation in full and light nodes fullfilling all functions of chain operation, however does not include the ability to author blocks (i.e. run as a validator on the network).

## Current status

This is the current status of the client -

- It can sync and operate on Polkadot POC-3 networks, and has been tested against Alexander (Polkadot), Dried Danta (Substrate) as well as Edgeware networks.
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

## Running via docker

A docker image is built from the supplied `Dockerfile`, which includes the latest version as supported and deployed to the registry. To run via docker, the following commands can be used. (Split into lines for readability) -

```
docker run -d \
  --name dd \
  -p 60666:60666 \
  -v ~/db:/data \
  jacogr/polkadot-js-client:latest \
    --chain alexander \
    --db-path /data \
    --db-type file \
    --telemetry-name "some-cool-name-here"
```

Some additional expansion to the above -

- docker `-d` runs the container as a daemon (skip as required)
- docker `--name` specifies the name of the container in `docker container ls`
- docker `-p` maps the p2p port externally (ensure the firewall is open on this)
- docker `-v` uses the local host path `~/db` as the data path, mapping it to the container itself.
- For `--chain` either `alexander` or `dried-danta` are built-in options.
- `--db-type` can be either `file` (default, experimental) or `lmdb` (experimental, more memory intensive).
- Images are deployed to [dockerhub](https://cloud.docker.com/u/jacogr/repository/docker/jacogr/polkadot-js-client), and we try to keep them current.

You can build your own container via the `./docker.sh` script included which will use the latest available repo version to base an image on.

## Contributing

- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically
