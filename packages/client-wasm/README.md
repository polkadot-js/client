# @polkadot/client-wasm

A wrapper around WebAssembly applications, creating an instance from the input and providing a consistent class with the methods exposed on top of it. It is non-specific to the Polkadot usage, rather is a extended utility provider around the base WebAssembly interfaces, reducing boilerplate.

## Updating the WASM proxies

Development notes for updating the WASM proxies runtimes.

First update the dependencies, e.g. binaryen and wabt (when not already available in the project root `tmp`) -

```sh
scripts/polkadot-wasm-build-binaryen.sh scripts/polkadot-wasm-build-wabt.sh
```

Compiling the WAT to WASM to JS, including converting the polkadot runtimes to a JS-compatible version -

```sh
scripts/polkadot-wasm-js-compat.sh
```
