[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client-runtime.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client-runtime)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square&path=packages/client-runtime)](https://david-dm.org/polkadot-js/client?path=packages/client-runtime)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square&path=packages/client-runtime)](https://david-dm.org/polkadot-js/client?path=packages/client-runtime#info=devDependencies)

# @polkadot/client-runtime

For WASM binaries to operate in the general environment, a limited libc-like environment needs to be made available. The sections here introduce _just enough_ for this to be feasible, while aligning with the Parity Polkadot implementation.

## Other runtimes

A comprehensive libc runtime has been implemented as part of the [musl](https://github.com/jfbastien/musl) project. Ideas for the memory allocation has been expanded from this project, specifically by understanding [arch/wasm32/wasm.js](https://github.com/jfbastien/musl/blob/190dffd1415cc8be52d4659aced51625d63bdbc1/arch/wasm32/wasm.js).
