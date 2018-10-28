const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/client-(chains|db|p2p|rpc|runtime|telemetry|types|wasm)(.*)$': '<rootDir>/packages/client-$1/src/$2',
    '@polkadot/client(.*)$': '<rootDir>/packages/client/src/$1'
  }
});
