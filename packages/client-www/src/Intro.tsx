// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';

type Props = {};
type State = {
  isClosed: boolean
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  z-index: 10;

  .box {
    display: inline-block;
    font-family: sans-serif;
    margin: 2rem auto;
    max-width: 50rem;
    text-align: left;

    .body {
      background: white;
      border-radius: 0 0 0.25rem 0.25rem;
      color: #282d35;
      line-height: 1.33;
      padding: 1rem 1.5rem;
      vertical-align: middle;

      li {
        margin: 0.25rem 0;
      }
    }

    .header {
      background: #282d35;
      border-radius: 0.25rem 0.25rem 0 0;
      color: #eee;
      padding: 1rem 1.5rem;
    }
  }
`;

export default class Intro extends React.PureComponent<Props, State> {
  state: State = {
    isClosed: false
  };

  render () {
    const { isClosed } = this.state;

    if (isClosed) {
      return null;
    }

    return (
      <Wrapper onClick={this.onClose}>
        <div className='box'>
          <div className='header'>Use Disclaimer &amp; Pitfalls</div>
          <div className='body'>
            <p>Please be aware that this is still highly experimental and really an alpha-quality POC. So while it does what it is supposed to at this point it time (which is not all we want and need), it still needs a lot of TLC.</p>
            <ul>
              <li>It uses the libp2p WebRTC transport to communicate with other nodes</li>
              <li>To find nodes, it uses a signalling server to gather connection details</li>
              <li>While it can discover all network nodes, it cannot connect to non-WebRTC nodes</li>
              <li>Sync will slow down if this tab moves into the background</li>
              <li>It does a very basic header-only sync (not a fully light-validating... yet)</li>
              <li>There is currrently no persistent storage, each refresh starts at #0</li>
            </ul>
            <p>So... enough reading, click anywhere to close this message.</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  private onClose = (): void => {
    this.setState({ isClosed: true });
  }
}
