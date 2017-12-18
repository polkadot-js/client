// ISC, Copyright 2017 Jaco Greeff
// @flow

const NAME = '@polkadot';

let pkgJson: any;
let stability = 'stable';

try {
  // $FlowFixMe production version
  pkgJson = require('./package.json');
} catch (error) {
  stability = 'development';
  pkgJson = require('../package.json');
}

module.exports = `${NAME}/${pkgJson.version}-${stability}`;
