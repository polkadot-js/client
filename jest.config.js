const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-(chains|db-chain|db|keyring|p2p|rpc|runtime|wasm)(.*)$': '<rootDir>/packages/client-$1/src/$2',
    '@polkadot/db-(polkadot|substrate)(.*)$': '<rootDir>/packages/db-$1/src/$2',
    '@polkadot/db(.*)$': '<rootDir>/packages/db/src/$1'
  }
});
