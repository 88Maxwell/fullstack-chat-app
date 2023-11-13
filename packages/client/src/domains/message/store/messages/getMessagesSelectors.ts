/* eslint-disable max-len */
import { ClientChat, Message } from "@chat-app/types";
import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "app/store";

const selectMessagesRoot = (state: AppState) => state.messages;
const selectMessagesByChatIdParams = (_: AppState, chatId: ClientChat["id"]) => chatId;

export const selectMessagesChatMap = createSelector(selectMessagesRoot, (st) => st.chatMap);

export const selectMessages = createSelector([selectMessagesRoot, selectMessagesByChatIdParams], (st, chatId) => {
  const targetChat = st.chatMap[chatId];

  if (!targetChat?.data?.messagesMap) return [];

  const targetMessages = Object.values(targetChat.data.messagesMap);

  return targetMessages.toSorted((a: Message, b: Message) => b.createdAt - a.createdAt);
});
