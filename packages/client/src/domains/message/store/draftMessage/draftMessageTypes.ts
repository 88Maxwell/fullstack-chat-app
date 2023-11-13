import { ClientChat, Message } from "@chat-app/types";

export interface DraftMessageState {
  draftMessageMap: Record<ClientChat["id"], Message["text"]>
}

export interface UpdateDraftMessageByChatIdPayload {
  chatId: ClientChat["id"] ;
  text: Message["text"];
}
