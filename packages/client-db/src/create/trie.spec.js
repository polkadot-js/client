// ISC, Copyright 2017 Jaco Greeff

const Trie = require('merkle-patricia-tree');
const LevelDown = require('leveldown');
const MemDown = require('memdown');

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createTrie = require('./trie');

describe('createTrie', () => {
  let trie;

  beforeEach(() => {
    trie = createTrie('./tmp', 'test', true);
  });

  it('returns a valid Trie instance', () => {
    expect(
      isInstanceOf(trie, Trie)
    ).toEqual(true);
  });

  it('creates a MemDown store (inMemory = true)', () => {
    expect(
      isInstanceOf(trie.db._db, MemDown)
    ).toEqual(true);
  });

  it('creates a LevelDown store (default, inMemory = false)', () => {
    expect(
      isInstanceOf(createTrie('./tmp', 'test', false).db._db, LevelDown)
    ).toEqual(true);
  });
});
