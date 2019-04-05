// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import https from 'https';

const getContent = function (url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (!response.statusCode || response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
      }

      const body: Array<string> = [];

      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });

    request.on('error', (err) => reject(err))
  });
};

export default function getExternalIp (): Promise<string | null> {
  return getContent('https://myexternalip.com/raw').catch(() => null);
}
