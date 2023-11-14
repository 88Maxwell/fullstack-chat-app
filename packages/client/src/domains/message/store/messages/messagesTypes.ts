import { Chat, Message } from "@chat-app/types";

export type MessagesSliceState = {
  chatMap: Record< Chat["id"], MessagesStateData>
};

export type MessagesStateData = Record<Message["id"], Message>;

export type AddMessagePayload = {
  message: Message;
};
