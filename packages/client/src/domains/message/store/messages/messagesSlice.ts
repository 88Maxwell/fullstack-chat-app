/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddMessagePayload,
  MessagesSliceState,
} from "./messagesTypes";

const initialState: MessagesSliceState = {
  chatMap : {},
};

export const messagesSlice = createSlice({
  name     : "messages",
  initialState,
  reducers : {
    addMessage(state, { payload }: PayloadAction<AddMessagePayload>) {
      const { message } = payload;
      const targetChatMessagesMap = state.chatMap[message.chatId];

      state.chatMap[message.chatId] = { ...targetChatMessagesMap, [message.id]: message };
    },
  },
});

export const { addMessage } = messagesSlice.actions;
