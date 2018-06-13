// Copyright 2017-2018 @polkadot/client authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type PackageJson = {
  name: string,
  version: string
};

const npmQuery = require('package-json');
const semcmp = require('semver-compare');

const DEVELOPMENT = 'development';

const name = 'polkadot-js';
let pkgJson: PackageJson;
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
    .then((npmJson: PackageJson) => npmJson.version)
    .catch(() => 'unknown');
}

async function getNpmStatus (): Promise<string> {
  const verNpm = await getNpmVersion();

  if (verNpm === 'unknown') {
    return 'cannot retrieve from npmjs.org';
  }

  switch (semcmp(pkgJson.version, verNpm)) {
    case 0:
      return 'up to date';

    case 1:
      return `newer, ${verNpm} published`;

    default:
      return `outdated, ${verNpm} available`;
  }
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
