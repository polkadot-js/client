const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-(chains|db|keyring|p2p|polkadot|rpc|state|wasm-runtime|wasm)(.*)$': '<rootDir>/packages/client-$1/src/$2'
  }
});
