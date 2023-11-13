import { ClientChat, Message } from "@chat-app/types";
import { AxiosError } from "axios";
import { LoadingStatus } from "domains/common/commonTypes";

export type GetMessageArgs = {
  prevToken?: number | null;
  nextToken?: number | null;
};

export type GetMessagesSliceState = {
  chatMap: Record< ClientChat["id"], {
    data: GetMessagesStateData,
    initialLoadingStatus: LoadingStatus
    initialError: null | AxiosError;
  }>
};

export type GetInitialMessagesDTO = {
  messages: Message[];
  chatId: ClientChat["id"];
};

export type GetMessagesStateData = {
  messagesMap: Record<Message["id"], Message>;
};

export type AddMessage = {
  message: Message;
  chatId: ClientChat["id"];
};

export interface ActionByChatIdPayload {
  chatId: ClientChat["id"];
}

export interface ErrorPayload {
  error: null | AxiosError;
  chatId: ClientChat["id"];
}
