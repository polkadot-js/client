const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-chains(.*)$': '<rootDir>/packages/client-chains/src/$1',
    '@polkadot/client-db(.*)$': '<rootDir>/packages/client-db/src/$1',
    '@polkadot/client-p2p(.*)$': '<rootDir>/packages/client-p2p/src/$1',
    '@polkadot/client-rpc(.*)$': '<rootDir>/packages/client-rpc/src/$1',
    '@polkadot/client-wasm(.*)$': '<rootDir>/packages/client-wasm/src/$1'
  }
});
