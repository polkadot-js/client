[![Dependency Status](https://david-dm.org/polkadot-js/jsonrpc.svg)](https://david-dm.org/polkadot-js/jsonrpc)
[![devDependency Status](https://david-dm.org/polkadot-js/jsonrpc/dev-status.svg)](https://david-dm.org/polkadot-js/jsonrpc#info=devDependencies)

# @polkadot/types

Base [flow](https://flow.org/) definitions for the base Polkadot types as defined in the [specification](https://github.com/w3f/polkadot-spec). It is useful for implementations, applications and libraries, where type-checking of the JavaScript base types is of importance.

## Usage

Installation -

```
npm install --save @polkadot/client-types
```

Usage -

```js
// @flow

import type { TAccountID, TBalance } from '@polkadot/client-types/base';

function getBalance (account: TAccountID): TBalance {
 ...
}
```
