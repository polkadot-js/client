[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client-chains.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client-chains)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square&path=packages/client-chains)](https://david-dm.org/polkadot-js/client?path=packages/client-chains)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square&path=packages/client-chains)](https://david-dm.org/polkadot-js/client?path=packages/client-chains#info=devDependencies)

# @polkadot/client-chains

Node configuration definitions for specific chains.

## Updating the WASM runtimes

Development notes for updating the WASM runtimes. As it stands, the WASM runtimes need to be updated periodically, at least in the case of the dev chain which tracks current - other chains should have the code on-chain. (And once Genesis is set, only updated with proposals)

First step would be to update the link to the latest WASM build release from https://github.com/paritytech/polkadot-wasm-bin - currently these are linked on commit hash, i.e. the actual packages are not published.

The next is an intermediate compilation step that takes the raw code and makes it more JS friendly. Basically encodes the WASM binary as a hex string which can then be easily loaded into a Uint8Array. For this step, the [scripts/polkadot-wasm-js-compat](../../scripts/polkadot-wasm-js-compat.sh) script can be used.

First update the dependencies, e.g. binaryen and wabt (when not already available in the project root `tmp`) -

```sh
$ scripts/polkadot-wasm-build-binaryen.sh && scripts/polkadot-wasm-build-wabt.sh
```

Now run the actual Wasm to Wasm-compatible-with-JS conversion step (effectively this takes the i64 returns and makes it available as calls with hi/lo to the JS environment) -

```sh
$ scripts/polkadot-wasm-js-compat.sh
```

Now we have JS-legal Wasm files and these have been converted to hex strings for easy Uint8Array loading available inside the [wasm](wasm) subdir.

In some cases it may be applicable to convert the proxy (making the external interfaces JS-legal) as well.

```sh
$ scripts/polkadot-wasm-wat2wasm.sh packages/client-chains/src/wasm/proxy_substrate.wat && scripts/polkadot-wasm-wasm2js.js --input packages/client-chains/src/wasm/proxy_substrate.wasm --output packages/client-chains/src/wasm/proxy_substrate_wasm.js
```
