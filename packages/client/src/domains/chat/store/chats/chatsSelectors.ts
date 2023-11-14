/* eslint-disable arrow-body-style */
import { Chat } from "@chat-app/types";
import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "app/store";

// BASE
const selectChatsRoot = (state: AppState) => state.chats;
const selectChatByIdParams = (_: AppState, chatId?: Chat["id"]) => chatId;
const selectChatsData = createSelector(selectChatsRoot, (st) => st.data);
const selectChatsMap = createSelector(selectChatsData, (st) => st.chatsMap);
export const selectIsChatsLoading = createSelector(selectChatsRoot, (st) => st.status === "pending");

// LIST
export const selectChatsFilters = createSelector(selectChatsData, (st) => st.filters);
export const selectChatsUserNameFilter = createSelector(selectChatsData, (st) => st.filters.userName);
export const selectChatsUserStatusFilter = createSelector(selectChatsData, (st) => st.filters.userStatus);
// CHAT BY ID
export const selectChatById = createSelector(selectChatsMap, selectChatByIdParams, (chatsMap, chatId) => {
  if (!chatId) return null;
  return chatsMap[chatId];
});

export const selectIsChatExist = createSelector(selectChatById, (chat) => !!chat);

export const selectChats = createSelector(selectChatsData, selectChatsFilters, (st, filters) => {
  let chats = Object.values(st.chatsMap);
  if (filters.userStatus === "online") {
    chats = chats.filter((c) => c.user.status === "online");
  }
  if (filters.userName) {
    chats.filter((c) => c.user.name.toLowerCase().slice(0, filters.userName.length) === filters.userName.toLowerCase());
  }

  return chats;
});
