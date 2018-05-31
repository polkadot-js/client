// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const addressDecode = require('@polkadot/util-keyring/address/decode');

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aConcat = require('@polkadot/util/u8a/concat');

module.exports = function genesisState ({ chain: { genesis: { consensus, council, councilVoting, democracy, session, staking } }, stateDb }: ChainState): void {
  stateDb.consensus.authorityCount.set(consensus.authorities.length);
  consensus.authorities.forEach((accountId, index) => {
    stateDb.consensus.authorityAt.set(accountId, index);
  });
  stateDb.consensus.code.set(consensus.code);

  stateDb.council.activeCouncil.set(
    council.activeCouncil.map(({ accountId, duration }) =>
      u8aConcat(
        addressDecode(accountId),
        bnToU8a(duration, 64, true)
      )
    )
  );
  stateDb.council.candidacyBond.set(council.candidacyBond);
  stateDb.council.carryCount.set(council.carryCount);
  stateDb.council.desiredSeats.set(council.desiredSeats);
  stateDb.council.inactiveGracePeriod.set(council.inactiveGracePeriod);
  stateDb.council.presentationDuration.set(council.presentationDuration);
  stateDb.council.presentSlashPerVoter.set(council.presentSlashPerVoter);
  stateDb.council.termDuration.set(council.termDuration);
  stateDb.council.votingBond.set(council.votingBond);
  stateDb.council.votingPeriod.set(council.votingPeriod);

  stateDb.councilVoting.cooloffPeriod.set(councilVoting.cooloffPeriod);
  stateDb.councilVoting.votingPeriod.set(councilVoting.votingPeriod);

  stateDb.democracy.launchPeriod.set(democracy.launchPeriod);
  stateDb.democracy.minimumDeposit.set(democracy.minimumDeposit);
  stateDb.democracy.votingPeriod.set(democracy.votingPeriod);

  stateDb.session.length.set(session.length);
  stateDb.session.validators.set(session.validators);

  staking.balances.forEach(({ accountId, balance }) =>
    stateDb.staking.freeBalanceOf.set(balance, accountId)
  );
  stateDb.staking.bondingDuration.set(staking.bondingDuration);
  stateDb.staking.currentEra.set(staking.currentEra);
  stateDb.staking.intentions.set(staking.intentions);
  stateDb.staking.sessionsPerEra.set(staking.sessionsPerEra);
  stateDb.staking.transactionFee.set(staking.transactionFee);
  stateDb.staking.validatorCount.set(staking.validatorCount);

  stateDb.db.commit();
};
