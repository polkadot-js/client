// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { loadWasm } = require('../test/helpers');
const wasm = require('./wasm');

describe('wasm', () => {
  let instance;

  describe('valid modules', () => {
    beforeEach(() => {
      instance = wasm(
        { wasm: {} }, {}, {},
        loadWasm('addTwo.wasm')
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
      instance = wasm(
        { wasm: {} }, {}, {},
        loadWasm('import.wasm'),
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
      instance = wasm(
        { wasm: {} }, {}, {},
        loadWasm('start.wasm'),
        { js: { callback } }
      );
    });

    it('allows imports to be called', () => {
      expect(callback).toHaveBeenCalledWith(1337);
    });
  });
});
