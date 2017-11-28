const config = require('@polkadot/dev/jest.config');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-p2p(.*)$': '<rootDir>/../client-p2p/src/$1',
    '@polkadot/client-rpc(.*)$': '<rootDir>/../client-rpc/src/$1'
  }
});
