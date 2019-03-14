// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Client from '@polkadot/client';

import config from './config';

type Props = {};

type State = {
  logs: Array<{
    text: string,
    type: 'error' | 'log' | 'warn'
  }>
};

const Wrapper = styled.div`
  pre {
    margin: 0;
    padding: 0.25rem 0.5rem;

    &.error {
      color: white;
      background: red;
    }

    &.warn {
      color: black;
      background: yellow;
    }
  }
`;

export default class App extends React.PureComponent<Props, State> {
  private client: Client;
  state: State = { logs: [] };

  constructor (props: Props) {
    super(props);

    console.error = this.consoleHook('error');
    console.log = this.consoleHook('log');
    console.warn = this.consoleHook('warn');

    this.client = new Client();
    this.client.start(config).catch((error) => {
      console.error('Failed to start client', error);
    });
  }

  render () {
    const { logs } = this.state;

    return (
      <Wrapper>
        {logs.map(({ text, type }, index) => (
          <pre className={type} key={index}>{text}</pre>
        ))}
      </Wrapper>
    );
  }

  private consoleHook (type: 'error' | 'log' | 'warn') {
    return (...args: Array<string>) => {
      this.setState(({ logs }): State => ({
        logs: logs.concat({
          text: args.join(' '),
          type
        })
      }));
    };
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Unable to find element with id 'root'`);
}

ReactDOM.render(<App />, rootElement);
