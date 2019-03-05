// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import ReactDOM from 'react-dom';
import Client from '@polkadot/client/index';

import config from './config';

export default class App extends React.PureComponent {
  render () {
    return (
      <div>hello</div>
    );
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Unable to find element with id 'root'`);
}

ReactDOM.render(<App />, rootElement);

new Client()
  .start(config)
  .catch((error) => {
    console.error('Failed to start client', error);
  });
