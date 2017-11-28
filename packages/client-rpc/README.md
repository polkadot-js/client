[![Build Status](https://travis-ci.org/polkadot-js/client-rpc.svg?branch=master)](https://travis-ci.org/polkadot-js/client-rpc)
[![Coverage Status](https://coveralls.io/repos/github/polkadot-js/client-rpc/badge.svg?branch=master)](https://coveralls.io/github/polkadot-js/client-rpc?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/polkadot-js/client-rpc.svg)](https://greenkeeper.io/)
[![Dependency Status](https://david-dm.org/polkadot-js/client-rpc.svg)](https://david-dm.org/polkadot-js/client-rpc)
[![devDependency Status](https://david-dm.org/polkadot-js/client-rpc/dev-status.svg)](https://david-dm.org/polkadot-js/client-rpc#info=devDependencies)

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
