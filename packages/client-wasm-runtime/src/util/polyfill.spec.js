// ISC, Copyright 2017-2018 Jaco Greeff

describe('io/polyfill', () => {
  let origTD;
  let origTE;

  beforeEach(() => {
    origTD = global.TextDecoder;
    origTE = global.TextEncoder;

    global.TextDecoder = null;
    global.TextEncoder = null;
  });

  afterEach(() => {
    global.TextDecoder = origTD;
    global.TextEncoder = origTE;
  });

  it('polyfills with no exceptions (without TextDecoder)', () => {
    expect(require('./polyfill')).toBeDefined();
    expect(global.TextDecoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextDecoder)', () => {
    global.TextDecoder = () => true;

    expect(require('./polyfill')).toBeDefined();
  });

  it('polyfills with no exceptions (without TextEncoder)', () => {
    expect(require('./polyfill')).toBeDefined();
    expect(global.TextEncoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextEncoder)', () => {
    global.TextEncoder = () => true;

    expect(require('./polyfill')).toBeDefined();
  });
});
