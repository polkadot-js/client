#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const fs = require('fs');
const { input, output } = require('yargs').argv;

if (!input) {
  console.error('Usage: wasm2js --input <file> --output <file>');
  process.exit(1);
}

if (!fs.existsSync(input)) {
  console.error(input, 'does not exist');
  process.exit(1);
}

const buffer = fs.readFileSync(input);
const base64 = buffer.toString('base64');

fs.writeFileSync(output, `// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Generated with polkadot-wasm-wasm2js (input: ${buffer.length} bytes, encoded: ${base64.length} bytes)

export default Buffer.from('${base64}', 'base64');
`);
