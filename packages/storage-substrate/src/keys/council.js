// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  candidacyBond: {
    description: 'How much should be locked up in order to submit candidacy',
    key: 'cou:cbo',
    type: 'Balance'
  },
  votingBond: {
    description: 'How much should be locked up in order to be able to submit votes',
    key: 'cou:vbo',
    type: 'Balance'
  },
  presentSlashPerVoter: {
    description: 'The punishment, per voter, if you provide an invalid presentation',
    key: 'cou:pss',
    type: 'Balance'
  },
  carryCount: {
    description: 'How many runners-up should have their approvals persist until the next vote',
    key: 'cou:cco',
    type: 'u32'
  },
  presentationDuration: {
    description: 'How long to give each top candidate to present themselves after the vote ends',
    key: 'cou:pdu',
    type: 'BlockNumber'
  },
  inactiveGracePeriod: {
    description: 'How many votes need to go by after a last vote',
    key: 'cou:vgp',
    type: 'u32'
  },
  votingPeriod: {
    description: 'How often (in blocks) to check for new votes',
    key: 'cou:per',
    type: 'BlockNumber'
  },
  termDuration: {
    description: 'How long each position is active for',
    key: 'cou:trm',
    type: 'BlockNumber'
  },
  desiredSeats: {
    description: 'The number of desired seats',
    key: 'cou:sts',
    type: 'u32'
  },
  activeCouncil: {
    description: 'The current council',
    key: 'cou:act',
    // Vec<(T::AccountId, T::BlockNumber)>;
    type: 'Bytes'
  },
  voteCount: {
    description: 'The total number of votes that have happened or are in progress',
    key: 'cou:vco',
    type: 'u32'
  },
  approvalsOf: {
    description: 'The last cleared vote index that this voter was last active at',
    key: 'cou:apr',
    params: {
      who: 'AccountId'
    },
    // TODO map [ T::AccountId => Vec<bool> ];
    type: 'Bytes'
  },
  registerInfoOf: {
    description: 'The vote index and list slot that the candidate was registered',
    key: 'cou:reg',
    params: {
      who: 'AccountId'
    },
    // TODO map [ T::AccountId => (VoteIndex, u32) ];
    type: 'Bytes'
  },
  lastActiveOf: {
    description: 'The last cleared vote index that this voter was last active at',
    key: 'cou:lac',
    params: {
      who: 'AccountId'
    },
    type: 'u32'
  },
  voterCount: {
    description: 'The number of voters',
    key: 'cou:vrs:len',
    type: 'u32'
  },
  voter: {
    description: 'The voter at a specific index',
    key: 'cou:vrs',
    params: {
      index: 'u32'
    },
    type: 'AccountId'
  },
  candidateCount: {
    description: 'Number of candidates',
    key: 'cou:cnc',
    type: 'u32'
  },
  candidates: {
    description: 'A list of candidates',
    key: 'cou:can',
    // TODO: Vec<T::AccountId>
    type: 'Bytes'
  },
  nextFinalise: {
    description: 'The accounts holding the seats that will become free',
    key: 'cou:nxt',
    // TODO (T::BlockNumber, u32, Vec<T::AccountId>);
    type: 'Bytes'
  },
  snapshotedStakes: {
    description: 'The balances',
    key: 'cou:sss',
    // TODO Vec<T::Balance>
    type: 'Bytes'
  },
  leaderboard: {
    description: 'Get the leaderboard if we;re in the presentation phase',
    key: 'cou:win',
    // TODO Vec<(T::Balance, T::AccountId)>
    type: 'Bytes'
  }
}: StorageDef$Section);
