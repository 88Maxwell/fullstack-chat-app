import type { User } from "./entitiesTypes";

export interface CreateUserParams {
  name: string;
}

export interface CreateUserResponse {
  user: User;
}

export interface GetChatsParams {
  userNameFilter?: string;
}

export interface GetChatsResponse {}

export interface OnMessageResponse {
  text: string;
  chatId: string;
}

export interface OnMessageParams {
  text: string;
  chatId: string;
}


export type SocketEventName =
   "connection" |
   "disconnect" |
   "sign-in" |
   "message" |
   "channel-broadcast" |
   "online-users";
