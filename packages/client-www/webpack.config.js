/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');

const packages = [
  'client',
  'client-chains',
  'client-db',
  'client-p2p',
  'client-rpc',
  'client-runtime',
  'client-signal',
  'client-sync',
  'client-telemetry',
  'client-types',
  'client-wasm'
];

const DEBUG = ''; // 'p2p,sync';

function createWebpack ({ alias = {}, context, name = 'index' }) {
  const pkgJson = require(path.join(context, 'package.json'));
  const ENV = process.env.NODE_ENV || 'development';
  const isProd = ENV === 'production';
  const hasPublic = fs.existsSync(path.join(context, 'public'));
  const plugins = hasPublic
    ? [new CopyWebpackPlugin([{ from: 'public' }])]
    : [];

  return {
    context,
    devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
    entry: [
      `./src/${name}.tsx`,
      isProd
        ? null
        : 'webpack-plugin-serve/client'
    ].filter((entry) => entry),
    mode: ENV,
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[hash:8].js',
      globalObject: '(typeof self !== \'undefined\' ? self : this)',
      path: path.join(context, 'build')
    },
    resolve: {
      alias: {
        ...alias,
        koa: 'empty',
        'koa-websocket': 'empty',
        'node-lmdb': 'empty',
        'package-json': 'empty',
        snappy: 'empty'
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /(node_modules)/,
          use: [
            require.resolve('thread-loader'),
            {
              loader: require.resolve('babel-loader'),
              options: require('@polkadot/dev-react/config/babel')
            }
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/[name].[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
          use: [
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    node: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      child_process: 'empty',
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendorOther: {
            chunks: 'initial',
            enforce: true,
            name: 'vendor',
            test: /node_modules\/(asn1|bn\.js|buffer|cuint|elliptic|lodash|moment|readable-stream|rxjs)/
          },
          vendorReact: {
            chunks: 'initial',
            enforce: true,
            name: 'react',
            test: /node_modules\/(i18next|react)/
          }
        }
      }
    },
    performance: {
      hints: false
    },
    plugins: plugins.concat([
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
          VERSION: JSON.stringify(pkgJson.version),
          DEBUG: JSON.stringify(DEBUG)
        }
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(context, `${hasPublic ? 'public/' : ''}${name}.html`),
        PAGE_TITLE: 'PRE Light Client'
      }),
      new webpack.optimize.SplitChunksPlugin(),
      new WebpackPluginServe({
        liveReload: true,
        port: 3000,
        static: path.join(process.cwd(), '/build')
      })
    ]),
    watch: !isProd
  };
}

module.exports = createWebpack({
  context: __dirname,
  alias: packages.reduce((alias, pkg) => {
    alias[`@polkadot/${pkg}`] = path.resolve(__dirname, `../${pkg}/src`);

    return alias;
  }, {})
});
