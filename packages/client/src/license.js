// ISC, Copyright 2017 Jaco Greeff
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
