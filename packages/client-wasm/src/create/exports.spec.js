// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createExports = require('./exports');
const createMemory = require('./memory');

describe('wasm', () => {
  let instance;

  describe('valid modules, with memory', () => {
    beforeEach(() => {
      instance = createExports(
        createMemory(0, 0),
        require('../../test/wasm/addTwo_wasm')
      );
    });

    it('allows calls into the module', () => {
      expect(
        instance.addTwo(22, 33)
      ).toEqual(55);
    });
  });

  describe('imports', () => {
    let callback;
    let instance;

    beforeEach(() => {
      callback = jest.fn();
      instance = createExports(
        createMemory(0, 0),
        require('../../test/wasm/import_wasm'),
        { js: { callback } }
      );
    });

    it('allows imports to be called', () => {
      instance.go(123);

      expect(callback).toHaveBeenCalledWith(123);
    });
  });

  describe('start', () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn();
      instance = createExports(
        createMemory(0, 0),
        require('../../test/wasm/start_wasm'),
        { js: { callback } }
      );
    });

    it('allows imports to be called', () => {
      expect(callback).toHaveBeenCalledWith(1337);
    });
  });
});
