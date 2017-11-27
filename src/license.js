// ISC, Copyright 2017 Jaco Greeff
// @flow

const fs = require('fs');
const path = require('path');

console.log(
  fs.readFileSync(
    path.join(__dirname, '../LICENSE')
  ).toString('utf-8')
);
console.log();
