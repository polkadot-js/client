// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type PackageJsonType = {
  name: string,
  version: string
};

const npmQuery = require('package-json');

const DEVELOPMENT = 'development';

const name = '@polkadot';
let pkgJson: PackageJsonType;
let stability = 'release';

try {
  // $FlowFixMe production version
  pkgJson = require('./package.json');
} catch (error) {
  stability = DEVELOPMENT;
  // flowlint-next-line untyped-import:off
  pkgJson = require('../package.json');
}

const isDevelopment = stability === DEVELOPMENT;

async function getNpmVersion (): Promise<string> {
  return npmQuery(pkgJson.name)
    .then((npmJson: PackageJsonType) => npmJson.version)
    .catch(() => 'unknown');
}

async function getNpmStatus (): Promimse<string> {
  const verNpm = await getNpmVersion();

  if (verNpm === pkgJson.version) {
    return 'up to date';
  }

  if (verNpm === 'unknown') {
    return 'cannot retrieve from npmjs.org';
  }

  return `outdated, ${verNpm} available`;
}

module.exports = {
  clientId: `${name}/${pkgJson.version}-${stability}`,
  isDevelopment,
  getNpmStatus,
  getNpmVersion,
  name,
  stability,
  version: pkgJson.version
};
