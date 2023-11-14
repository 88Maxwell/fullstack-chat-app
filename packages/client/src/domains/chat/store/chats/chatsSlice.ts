/* eslint-disable no-param-reassign, @typescript-eslint/naming-convention */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@chat-app/types";
import {
  AddChatToListPayload,
  GetChatsState,
  SuccessGetChatsPayload,
  SetChatsClientNameFilterPayload,
} from "./chatsTypes";

const initialState: GetChatsState = {
  data : {
    chatsMap : {},
    filters  : {
      userName   : "",
      userStatus : "online",
    },
  },
  status : "idle",
  error  : "",
};

export const chatsSlice = createSlice({
  name     : "chats",
  initialState,
  reducers : {
    requestGetChats(state) {
      state.data.chatsMap = {};
      state.status = "pending";
    },

    successGetChats(state, { payload }: PayloadAction<SuccessGetChatsPayload>) {
      const { chats = [] } = payload;

      state.data.chatsMap = chats.reduce((acc, chat) => {
        const existChat = state.data.chatsMap[chat.id] || {};

        acc[chat.id] = { ...existChat, ...chat };
        return acc;
      }, { ...state.data.chatsMap });

      state.status = "success";
    },

    setChatsStatusSuccess(state) {
      state.status = "success";
    },

    failureGetChats(state, { payload }) {
      state.status = "failure";
      state.error = payload;
    },

    setStatusFilterOnline(state) {
      state.data.filters.userStatus = "online";
    },

    setStatusFilterAll(state) {
      delete state.data.filters.userStatus;
    },

    setChatsUserNameFilter(state, { payload }: PayloadAction<SetChatsClientNameFilterPayload>) {
      state.data.filters.userName = payload;
    },

    addChatToList(state, { payload }: PayloadAction<AddChatToListPayload>) {
      const { chat } = payload;

      state.data.chatsMap[chat.id] = chat;
    },

    userGoesOffline(state, { payload }: PayloadAction<{ userId: User["id"] }>) {
      const targetChat = Object.values(state.data.chatsMap).find((c) => c.user.id === payload.userId);
      if (!targetChat) return;
      targetChat.user.status = "offline";
    },
  },
});

export const {
  addChatToList,
  successGetChats,
  failureGetChats,
  requestGetChats,
  setStatusFilterOnline,
  setStatusFilterAll,
  setChatsUserNameFilter,
  setChatsStatusSuccess,
  userGoesOffline,
} = chatsSlice.actions;
