// ISC, Copyright 2017 Jaco Greeff

const BaseMessage = require('./base');

describe('BaseMessage', () => {
  let base;

  beforeEach(() => {
    base = new BaseMessage(123);
  });

  it('expects a numeric id', () => {
    expect(
      () => new BaseMessage()
    ).toThrow(/ numeric id/);
  });

  describe('decodeRlp', () => {
    it('expects a numeric message id', () => {
      expect(
        () => base.decodeRlp()
      ).toThrow(/numeric id/);
    });

    it('expects id to match constructor id', () => {
      expect(
        () => base.decodeRlp(1)
      ).toThrow(/id to match/);
    });

    it('expects raw body in message', () => {
      expect(
        () => base.decodeRlp(123)
      ).toThrow(/raw message body/);
    });

    it('calls into _rawDecode, failing (base)', () => {
      expect(
        () => base.decodeRlp(123, [])
      ).toThrow(/Expected _rawDecodeRlp/);
    });
  });

  describe('encodeRlp', () => {
    it('calls into _rawEncode, failing (base)', () => {
      expect(
        () => base.encodeRlp()
      ).toThrow(/Expected _rawEncodeRlp/);
    });

    it('returns message containing id and raw (implemented)', () => {
      const raw = ['something', ['else']];

      base._rawEncodeRlp = () => raw;

      expect(
        base.encodeRlp()
      ).toEqual([Buffer.from([123]), raw]);
    });
  });
});
