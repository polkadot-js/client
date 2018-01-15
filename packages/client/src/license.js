// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const fs = require('fs');
const path = require('path');

let license: string;

function readFile (name: string): string {
  return fs.readFileSync(
    path.join(__dirname, name)
  ).toString('utf-8');
}

try {
  // production
  license = readFile('LICENSE');
} catch (error) {
  // development
  license = readFile('../LICENSE');
}

console.log(license);
console.log();
