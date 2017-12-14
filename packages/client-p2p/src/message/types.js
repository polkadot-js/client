// ISC, Copyright 2017 Jaco Greeff
// @flow

export type MessageTypeEnum = 'status';

export type MessageType = {
  type: MessageTypeEnum,
  message: any
}
