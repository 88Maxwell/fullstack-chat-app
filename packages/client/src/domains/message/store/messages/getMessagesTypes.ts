import { Chat, Message } from "@chat-app/types";
import { AxiosError } from "axios";
import { LoadingStatus } from "domains/common/commonTypes";

export type GetMessageArgs = {
  prevToken?: number | null;
  nextToken?: number | null;
};

export type GetMessagesSliceState = {
  chatMap: Record< Chat["id"], {
    data: GetMessagesStateData,
    initialLoadingStatus: LoadingStatus
    initialError: null | AxiosError;
  }>
};

export type GetInitialMessagesDTO = {
  messages: Message[];
  chatId: Chat["id"];
};

export type GetMessagesStateData = {
  messagesMap: Record<Message["id"], Message>;
};

export type AddMessage = {
  message: Message;
  chatId: Chat["id"];
};

export interface ActionByChatIdPayload {
  chatId: Chat["id"];
}

export interface ErrorPayload {
  error: null | AxiosError;
  chatId: Chat["id"];
}
