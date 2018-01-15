// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const createImports = require('./imports');
const createInstance = require('./instance');
const createMemory = require('./memory');
const createModule = require('./module');
const createTable = require('./table');

module.exports = {
  createImports,
  createInstance,
  createMemory,
  createModule,
  createTable
};
