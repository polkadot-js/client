// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  proposalCount: {
    description: 'The number of (public) proposals that have been made so far',
    key: 'dem:ppc',
    type: 'u32'
  },
  proposal: {
    description: 'The public proposals. Unsorted.',
    key: 'dem:pub:',
    params: {
      index: 'u32'
    },
    // TODO: Vec<(PropIndex, T::Proposal, T::AccountId)>
    type: 'Bytes'
  },
  depositOf: {
    description: 'Those who have locked a deposit',
    key: 'dem:dep:',
    params: {
      index: 'u32'
    },
    // TODO: map [ PropIndex => (T::Balance, Vec<T::AccountId>) ];
    type: 'Bytes'
  },
  launchPeriod: {
    description: 'How often (in blocks) new public referenda are launched',
    key: 'dem:lau',
    type: 'BlockNumber'
  },
  minimumDeposit: {
    description: 'The minimum amount as a deposit for a public referendum',
    key: 'dem:lau',
    type: 'Balance'
  },
  votingPeriod: {
    description: 'How often (in blocks) to check for new votes',
    key: 'dem:per',
    type: 'BlockNumber'
  },
  referendumCount: {
    description: 'The number of referendums started so far',
    key: 'dem:rco',
    type: 'u32'
  },
  nextTally: {
    description: 'The next referendum index that should be tallied',
    key: 'dem:nxt',
    type: 'u32'
  },
  referendumInfoOf: {
    description: 'Details for a specific referendum',
    key: 'dem:pro:',
    params: {
      referendum: 'u32'
    },
    // TODO: map [ ReferendumIndex => (T::BlockNumber, T::Proposal, VoteThreshold) ];
    type: 'Bytes'
  },
  votersFor: {
    description: 'Get the voters for the current proposal',
    key: 'dem:vtr:',
    params: {
      referendum: 'u32'
    },
    // TODO: map [ ReferendumIndex => Vec<T::AccountId> ];
    type: 'Bytes'
  },
  voteOf: {
    description: 'Get the vote for Account',
    key: 'dem:vot:',
    params: {
      referendum: 'u32',
      who: 'AccountId'
    },
    type: 'bool'
  }
}: StorageDef$Section);
