#!/usr/bin/env node
// ISC, Copyright 2017 Jaco Greeff

try {
  require('../index.js'); // production
} catch (error) {
  require('babel-register');
  require('../src/index.js'); // development
}
