// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  cooloffPeriod: {
    description: 'The coolof period',
    key: 'cov:cooloff',
    type: 'BlockNumber'
  },
  votingPeriod: {
    description: 'The voting period',
    key: 'cov:period',
    type: 'BlockNumber'
  },
  proposals: {
    description: 'The current proposals',
    key: 'cov:prs',
    // TODO: Vec<(T::BlockNumber, T::Hash)>
    type: 'Bytes'
  },
  proposalOf: {
    description: 'The proposal by hash',
    key: 'cov:pro',
    params: {
      hash: 'Hash'
    },
    // map [ T::Hash => T::Proposal ];
    type: 'Proposal'
  },
  proposalVoters: {
    description: 'Voters on a proposal',
    key: 'cov:voters:',
    params: {
      hash: 'Hash'
    },
    // TODO map [ T::Hash => Vec<T::AccountId> ];
    type: 'Bytes'
  },
  councilVoteOf: {
    description: 'Council votes on proposal',
    key: 'cov:vote:',
    params: {
      hash: 'Hash',
      who: 'AccountId'
    },
    // map [ (T::Hash, T::AccountId) => bool ];
    type: 'bool'
  },
  vetoedProposal: {
    description: 'Council vetos on a proposal',
    key: 'cov:veto:',
    params: {
      hash: 'Hash'
    },
    // TODO: map [ T::Hash => (T::BlockNumber, Vec<T::AccountId>) ];
    type: 'Bytes'
  }
}: StorageDef$Section);
