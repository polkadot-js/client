const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-(chains|db-chain|db|keyring|p2p|rpc|runtime|wasm)(.*)$': '<rootDir>/packages/client-$1/src/$2'
  }
});
