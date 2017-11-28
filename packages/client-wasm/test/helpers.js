// ISC, Copyright 2017 Jaco Greeff

const fs = require('fs');
const path = require('path');

const u8aFromBuffer = require('@polkadot/util/u8a/fromBuffer');

function loadWasm (filename) {
  return u8aFromBuffer(
    fs.readFileSync(
      path.join(__dirname, filename)
    )
  );
}

module.exports = {
  loadWasm
};
