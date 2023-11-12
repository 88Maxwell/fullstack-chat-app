/* eslint-disable no-param-reassign, @typescript-eslint/naming-convention */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddChatToListPayload,
  GetChatsState,
  SuccessGetChatsPayload,
  SetChatLastMessagePayload,
  SetChatsClientNameFilterPayload,
} from "./getChatsTypes";

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
      state.data.filters.userStatus = null;
    },

    setChatsUserNameFilter(state, { payload }: PayloadAction<SetChatsClientNameFilterPayload>) {
      state.data.filters.userName = payload;
    },

    addChatToList(state, { payload }: PayloadAction<AddChatToListPayload>) {
      const { chat } = payload;

      state.data.chatsMap[chat.id] = chat;
    },

    setChatLastMessage(state, action: PayloadAction<SetChatLastMessagePayload>) {
      const { message, chatId } = action.payload;

      const foundChat = state.data.chatsMap[chatId];
      if (!foundChat) return;
      if ((foundChat?.lastMessage?.createdAt || 0) > message.createdAt) return;
      foundChat.lastMessage = message;
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
  setChatLastMessage,
  setChatsUserNameFilter,
  setChatsStatusSuccess,
} = chatsSlice.actions;
