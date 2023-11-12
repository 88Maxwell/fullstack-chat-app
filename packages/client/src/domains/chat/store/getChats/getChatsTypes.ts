import { Chat } from "domains/chat/entity/chatTypes";
import { Identifier, UserStatus } from "@chat-app/types";
import { LoadingStatus } from "domains/common/commonTypes";
import { Message } from "domains/message/enitity";

export type GetChatsState = {
  data: {
    chatsMap: Record<Chat["id"], Chat>;
    filters: {
      userName: string,
      userStatus: UserStatus | null;
    }
  };
  status: LoadingStatus;
  error: string;
};

export interface SetChatLastMessagePayload {
  chatId: Identifier;
  message: Message;
}

export interface ToogleChatFavorite {
  chatId: Chat["id"];
}

export interface AddChatToListActionParams {
  chatId: Chat["id"];
  switchToChat?: boolean;
}

export interface AddChatToListPayload {
  chat: Chat;
}

export interface ChatSessionStartedPayload {
  chatId: Identifier;
  startedAtMs: number;
}

export interface SuccessGetChatsPayload {
  chats: Chat[];
}

export type SetChatsClientNameFilterPayload = string;
