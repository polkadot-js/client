// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const fs = require('fs');
const path = require('path');

const bufferToU8a = require('@polkadot/util/buffer/toU8a');

function loadWasm (filename) {
  return bufferToU8a(
    fs.readFileSync(
      path.join(__dirname, 'wasm', filename)
    )
  );
}

module.exports = {
  loadWasm
};
