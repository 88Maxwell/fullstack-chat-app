import { ClientChat } from "@chat-app/types";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "app/store";

const selectDraftMessage = (state: AppState) => state.draftMessage;
const selectTargetChatId = (_: AppState, chatId?: ClientChat["id"]) => chatId;

export const selectDraftMessageByChatId = createSelector(
  [selectDraftMessage, selectTargetChatId],
  (st, chatId) => (chatId ? st.draftMessageMap[chatId] : ""),
);
