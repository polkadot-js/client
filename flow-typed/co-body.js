// @flow

declare module 'co-body' {
  declare type IpRegex$Options = {
    exact: boolean
  };

  declare module.exports: {
    json: (req: http$IncomingMessage) => Promise<{ [string]: mixed }>;
    text: (req: http$IncomingMessage) => Promise<string>;
  }
}
