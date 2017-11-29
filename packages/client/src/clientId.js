// ISC, Copyright 2017 Jaco Greeff
// @flow

const NAME: string = 'node.js';

let pkgJson: any;
let stability: string;

try {
  // $FlowFixMe compiled version
  pkgJson = require('./package.json');
  stability = 'stable';
} catch (error) {
  // $FlowFixMe source version
  pkgJson = require('../package.json');
  stability = 'development';
}

module.exports = `${NAME}/${pkgJson.version}-${stability}`;
