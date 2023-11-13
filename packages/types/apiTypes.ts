
import type { Chat, Message, User, UserStatus } from "./entitiesTypes";

export interface CreateUserParams {
  name: string;
}

export interface CreateUserResponse {
  user: User;
}

export interface GetChatsParams {
  userNameFilter?: string;
  userStatusFilter?: UserStatus | null;
}

export interface GetChatsResponse {
  chats: Chat[]
}

export interface OnMessageResponse {
  text: string;
  chatId: string;
}

export interface EmitMessageParams {
  chatId: Chat["id"];
  text: string;
}

export interface OnMessageParams {
  chatId: Chat["id"];
  message: Message
}


export type SocketEventName =
   "connection" |
   "disconnect" |
   "authorize" |
   "message" |
   "unauthorize";


  export interface OnUserAuthorizedParams {
    chat: Chat;
  }
  export interface EmitAuthorizeParams {
    user: User;
  }

  