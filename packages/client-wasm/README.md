[![Dependency Status](https://david-dm.org/polkadot-js/wasm.svg)](https://david-dm.org/polkadot-js/wasm)
[![devDependency Status](https://david-dm.org/polkadot-js/wasm/dev-status.svg)](https://david-dm.org/polkadot-js/wasm#info=devDependencies)

# @polkadot/wasm

A wrapper around WebAssembly applications, creating an instance from the input and providing a consistent class with the methods exposed on top of it. It is non-specific to the Polkadot usage, rather is is a extended utility provider around the base WebAssembly interfaces, reducing boilerplate.

## Usage

Installation -

```
npm install --save @polkadot/client-wasm
```

Calling -

```js
const Wasm = require('@polkadot/client-wasm');
const wasm = Wasm.fromCode(new Uint8Array([...]));

console.log('result', wasm.addTwo(1, 2)); // => 3
```
