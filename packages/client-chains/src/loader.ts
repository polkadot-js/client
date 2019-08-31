// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';
import { Config } from '@polkadot/client/types';
import { ChainLoader } from './types';

import fs from 'fs';
import { trieRoot } from '@polkadot/trie-hash';
import { assert, hexToU8a } from '@polkadot/util';

import chains from './chains';

export default class Loader implements ChainLoader {
  public readonly chain: Chainspec;

  public readonly id: string;

  public readonly genesisRoot: Uint8Array;

  public constructor ({ chain }: Config) {
    this.chain = chains[chain] || this.loadJson(chain);

    this.genesisRoot = this.calculateGenesisRoot();
    this.id = this.chain.id;
  }

  private loadJson (chain: string): Chainspec {
    assert(chain.endsWith('.json'), 'Expected .json extension on custom non built-in chain');
    assert(fs.existsSync(chain), `Unable to find custom ${chain}`);

    return JSON.parse(
      fs.readFileSync(chain, { encoding: 'utf-8' })
    );
  }

  private calculateGenesisRoot (): Uint8Array {
    const { genesis: { raw } } = this.chain;

    return trieRoot(
      Object.keys(raw).map((key): { k: Uint8Array; v: Uint8Array } => ({
        k: hexToU8a(key),
        v: hexToU8a(raw[key])
      }))
    );
  }
}
