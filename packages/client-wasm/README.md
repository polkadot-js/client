[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client-wasm.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client-wasm)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square&path=packages/client-wasm)](https://david-dm.org/polkadot-js/client?path=packages/client-wasm)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square&path=packages/client-wasm)](https://david-dm.org/polkadot-js/client?path=packages/client-wasm#info=devDependencies)

# @polkadot/client-wasm

A wrapper around WebAssembly applications, creating an instance from the input and providing a consistent class with the methods exposed on top of it. It is non-specific to the Polkadot usage, rather is is a extended utility provider around the base WebAssembly interfaces, reducing boilerplate.

## Updating the WASM proxies

Development notes for updating the WASM proxies runtimes.

First update the dependencies, e.g. binaryen and wabt (when not already available in the project root `tmp`) -

```sh
scripts/polkadot-wasm-build-binaryen.sh scripts/polkadot-wasm-build-wabt.sh
```

Compiling the Wat to Wasm -

```sh
scripts/polkadot-wasm-wat2wasm.sh packages/client-wasm/src/wasm/proxy_runtime.wat &&\
scripts/polkadot-wasm-wat2wasm.sh packages/client-wasm/src/wasm/proxy_substrate.wat
```

Now we can convert these to allow the proxy (making the external interfaces JS-legal) as well.

```sh
scripts/polkadot-wasm-wasm2js.js --input packages/client-wasm/src/wasm/proxy_runtime.wasm --output packages/client-wasm/src/wasm/proxy_runtime_wasm.js &&\
scripts/polkadot-wasm-wasm2js.js --input packages/client-wasm/src/wasm/proxy_substrate.wasm --output packages/client-wasm/src/wasm/proxy_substrate_wasm.js
```
