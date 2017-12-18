// @flow

import type { LevelUp } from 'levelup';

type MerklePatriciaTree$BatchOperation = {
  key: Buffer | string,
  type: 'del' | 'put',
  value: Buffer | string
}

type MerklePatriciaTree$Options = {
  root?: Buffer,
  isCheckpoint?: boolean,
  EMPTY_TRIE_ROOT?: Buffer
}

declare class MerklePatriciaTree {
  constructor (database: LevelUp, options?: MerklePatriciaTree$Options): MerklePatriciaTree;

  // copy
  copy (): MerklePatriciaTree;

  // operations
  batch (operations: Array<MerklePatriciaTree$BatchOperation>, callback: (error?: Error) => void): void;
  del (key: Buffer | string, callback: (error?: Error) => void): void;
  get (key: Buffer | string, callback: (error?: Error, value: Buffer) => void): void;
  put (key: Buffer | string, value: Buffer | string, callback: (error?: Error) => void): void;

  // checks
  checkRoot (root: Buffer, callback: (error?: Error, exists: boolean) => void): void;

  // checkpoints
  checkpoint (): void;
  commit (callback: (error: ?Error) => void): void;
  revert (callback: (error: ?Error) => void): void;

  // static
  // TODO: proof is actually Array<TrieNode>, define
  static prove (trie: MerklePatriciaTree, key: string, callback: (error?: Error, proof: Array<any>) => void): void;
  static verifyProof (rootHash: Buffer, key: string, proof: Array<any>, callback: (error?: Error, value: string) => void): void;
}

declare module 'merkle-patricia-tree' {
  declare module.exports: typeof MerklePatriciaTree;
}

declare module 'merkle-patricia-tree/secure' {
  declare module.exports: typeof MerklePatriciaTree;
}
