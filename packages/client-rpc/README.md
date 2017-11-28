[![Dependency Status](https://david-dm.org/polkadot-js/client.svg?path=packages/client-rpc)](https://david-dm.org/polkadot-js/client?path=packages/client-rpc)
[![devDependency Status](https://david-dm.org/polkadot-js/client/dev-status.svg?path=packages/client-rpc)](https://david-dm.org/polkadot-js/client?path=packages/client-rpc#info=devDependencies)

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
