// ISC, Copyright 2017-2018 Jaco Greeff

const BaseMessage = require('./base');

describe('BaseMessage', () => {
  let base;

  beforeEach(() => {
    base = new BaseMessage(123);
  });

  describe('decode', () => {
    it('expects id to match constructor id', () => {
      expect(
        () => base.decode(1)
      ).toThrow(/id to match/);
    });

    it('calls into _rawDecode, failing (base)', () => {
      expect(
        () => base.decode(123, [])
      ).toThrow(/Expected _rawDecode/);
    });
  });

  describe('encode', () => {
    it('calls into _rawEncode, failing (base)', () => {
      expect(
        () => base.encode()
      ).toThrow(/Expected _rawEncode/);
    });

    it('returns message containing id and raw (implemented)', () => {
      const raw = ['something', ['else']];

      base._rawEncode = () => raw;

      expect(
        base.encode()
      ).toEqual([Buffer.from([123]), raw]);
    });
  });
});
