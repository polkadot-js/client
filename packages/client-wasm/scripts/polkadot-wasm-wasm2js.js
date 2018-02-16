#!/usr/bin/env node
// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const fs = require('fs');
const { input } = require('yargs').argv;

function chunk (arr, size = 16) {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(
      arr
        .slice(i, i + size)
        .map((v) => '0x' + (`0${v.toString(16)}`.slice(-2)))
    );
  }

  return chunks;
}

if (!input) {
  console.error('Usage: wasm2js --input <file>');
  process.exit(1);
}

if (!fs.existsSync(input)) {
  console.error(input, 'does not exist');
  process.exit(1);
}

const preamble = '// Copyright 2017-2018 Jaco Greeff\n// This software may be modified and distributed under the terms\n// of the ISC license. See the LICENSE file for details.\n\n// Generated with polkadot-wasm-wasm2js\n';
const contents = chunk(fs.readFileSync(input))
  .map((line) => `  ${line.join(', ')}`)
  .join(',\n');

fs.writeFileSync(input.replace('.wasm', '.js'), `${preamble}module.exports = new Uint8Array([\n${contents}\n]);\n`);
