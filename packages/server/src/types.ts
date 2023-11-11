export interface IMessageInfo {
  channelId?: number;
  fromId: number;
  toId?: number;
  message: IMessage;
  createdAt: number;
  source: IdMessageSource;
  companyId?: number;
  selfEcho?: boolean;
}

export enum IdMessageSource {
  User_Message = "User_Message",
  Channel_Message = "Channel_Message",
}

export interface IMessage {
  text?: string;
  imageLink?: string;
  fileLink?: string;
  webLink?: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  companyId?: string;
  companyName?: string;
  avatar?: string;
}
export enum SocketEventName {
  connection = "connection",
  disconnect = "disconnect",
  signIn = "sign-in",
  message = "message",
  channelBroadcast = "channel-broadcast",
  onlineUsers = "online-users",
}
