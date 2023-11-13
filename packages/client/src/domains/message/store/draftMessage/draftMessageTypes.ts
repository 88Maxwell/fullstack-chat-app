import { Chat, Message } from "@chat-app/types";

export interface DraftMessageState {
  draftMessageMap: Record<Chat["id"], Message["text"]>
}

export interface UpdateDraftMessageByChatIdPayload {
  chatId: Chat["id"] ;
  text: Message["text"];
}
