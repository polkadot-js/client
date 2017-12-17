[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/client-db.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/client-db)
[![travis](https://img.shields.io/travis/polkadot-js/client.svg?style=flat-square)](https://travis-ci.org/polkadot-js/client)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/client.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/client/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/client.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/client?branch=master)
[![dependency](https://david-dm.org/polkadot-js/client.svg?style=flat-square&path=packages/client-db)](https://david-dm.org/polkadot-js/client?path=packages/client-db)
[![devDependency](https://david-dm.org/polkadot-js/client/dev-status.svg?style=flat-square&path=packages/client-db)](https://david-dm.org/polkadot-js/client?path=packages/client-db#info=devDependencies)

# @polkadot/client-db

An interface to the database layer

## Usage

Installation -

```
npm install --save @polkadot/client-db
```

Usage -

```js
const DB = require('@polkadot/client-db');

const db = new DB('my-awesome-db'); // name

db.put('some-key', '12345');
```
