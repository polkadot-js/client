const config = require('@polkadot/dev/jest.config');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-p2p(.*)$': '<rootDir>/packages/client-p2p/src/$1',
    '@polkadot/client-rpc(.*)$': '<rootDir>/packages/client-rpc/src/$1'
  }
});
