// ISC, Copyright 2017 Jaco Greeff

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
