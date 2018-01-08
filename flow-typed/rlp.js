// @flow

// FIXME: EncodedType here is not accurate, rather it aligns with our specific use of the RLP encoding/decoding

declare module 'rlp' {
  declare type EncodedType = [Buffer, Array<any>];

  declare module.exports: {
    decode: (buffer: Buffer) => EncodedType;
    encode: (buffers: EncodedType) => Buffer;
  }
}
