// ISC, Copyright 2017 Jaco Greeff
// @flow

const NAME = 'polkadot-js';

let pkgJson: any;
let stability = 'stable';

try {
  // $FlowFixMe compiled version
  pkgJson = require('./package.json');
} catch (error) {
  stability = 'development';

  // $FlowFixMe source version
  pkgJson = require('../package.json');
}

module.exports = `${NAME}/${pkgJson.version}-${stability}`;
