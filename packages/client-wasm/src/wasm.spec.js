// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { loadWasm } = require('../test/helpers');

const Wasm = require('./wasm');

describe('Wasm', () => {
  describe('checks', () => {
    let origWebAssembly;

    beforeEach(() => {
      origWebAssembly = global.WebAssembly;

      global.WebAssembly = class {
        static Module = class {};
        static Memory = class {};
        static Table = class {};
        static Instance = class {};
      };
    });

    afterEach(() => {
      global.WebAssembly = origWebAssembly;
    });

    it('check for instance as WebAssembly.Instance', () => {
      expect(
        () => new Wasm('notInstance')
      ).toThrow(/WebAssembly instance to be provided/);
    });

    it('disallows empty exports', () => {
      expect(
        () => new Wasm(new WebAssembly.Instance())
      ).toThrow(/No exports found/);
    });
  });

  describe('instance', () => {
    let wasm;

    describe('valid modules', () => {
      beforeEach(() => {
        wasm = Wasm.fromCode(
          loadWasm('addTwo.wasm')
        );
      });

      it('creates a valid instance via fromCode', () => {
        expect(
          isInstanceOf(wasm, Wasm)
        ).toEqual(true);
      });

      it('allows calls into the module', () => {
        expect(
          wasm.addTwo(22, 33)
        ).toEqual(55);
      });
    });

    describe('imports', () => {
      let callback;
      let wasm;

      beforeEach(() => {
        callback = jest.fn();
        wasm = Wasm.fromCode(
          loadWasm('import.wasm'),
          { js: { callback } }
        );
      });

      it('allows imports to be called', () => {
        wasm.go(123);

        expect(callback).toHaveBeenCalledWith(123);
      });
    });

    describe('start', () => {
      let callback;
      // let wasm;

      beforeEach(() => {
        callback = jest.fn();
        Wasm.fromCode(
          loadWasm('start.wasm'),
          { js: { callback } }
        );
      });

      it('allows imports to be called', () => {
        // wasm.go(123);

        expect(callback).toHaveBeenCalledWith(1337);
      });
    });
  });
});
