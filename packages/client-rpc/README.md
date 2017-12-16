[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client-rpc.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client-rpc)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square&path=packages/client-rpc)](https://david-dm.org/polkadot-js/client?path=packages/client-rpc)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square&path=packages/client-rpc)](https://david-dm.org/polkadot-js/client?path=packages/client-rpc#info=devDependencies)

# @polkadot/client-rpc

An RPC server with configurable handlers. It is intended to be used in network clients to spin up a JsonRPC server with minimal configuration and boilerplate.

## Usage

```
npm install --save @polkadot/client-rpc
```

The by using the library -

```js
const Provider = require('@polkadot/api-provider/http');
const Server = require('@polkadot/client-rpc');

const server = new Server({ port: 9901 }, {
  'client_version': () => 'Polka/0.0.1'
});

new Provider('http://localhost:9901')
  .send('client_version', [])
  .then((version) => {
    console.log('The server is running', version;)
  });
```
