
import type { ClientChat, Message, User, UserStatus } from "./entitiesTypes";

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
  chats: ClientChat[]
}

export interface OnMessageResponse {
  text: string;
  chatId: string;
}

export interface OnMessageParams {
  chatId: ClientChat["id"];
  message: Message
}


export type SocketEventName =
   "connection" |
   "disconnect" |
   "authorize" |
   "message" |
   "unauthorize";


   export interface OnMessageParams {
    text: string;
  }
  
  export interface OnUserAuthorizedParams {
    chat: ClientChat;
  }
  export interface EmitAuthorizeParams {
    user: User;
  }

  