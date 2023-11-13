import {
  ClientChat, Identifier, UserStatus,
} from "@chat-app/types";
import { LoadingStatus } from "domains/common/commonTypes";

export type GetChatsState = {
  data: {
    chatsMap: Record<ClientChat["id"], ClientChat>;
    filters: {
      userName: string,
      userStatus: UserStatus | null;
    }
  };
  status: LoadingStatus;
  error: string;
};

export interface ToogleChatFavorite {
  chatId: ClientChat["id"];
}

export interface AddChatToListActionParams {
  chatId: ClientChat["id"];
  switchToChat?: boolean;
}

export interface AddChatToListPayload {
  chat: ClientChat;
}

export interface ChatSessionStartedPayload {
  chatId: Identifier;
  startedAtMs: number;
}

export interface SuccessGetChatsPayload {
  chats: ClientChat[];
}

export type SetChatsClientNameFilterPayload = string;
