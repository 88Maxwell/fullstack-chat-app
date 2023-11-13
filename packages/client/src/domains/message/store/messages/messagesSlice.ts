/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@chat-app/types";
import {
  ActionByChatIdPayload,
  AddMessage,
  ErrorPayload,
  GetInitialMessagesDTO,
  GetMessagesSliceState,
} from "./getMessagesTypes";

const defaultState = {
  data : {
    messagesMap : {},
  },
  initialLoadingStatus : "idle",
  initialError         : null,
};

const initialState: GetMessagesSliceState = {
  chatMap : {},
};

export const messagesSlice = createSlice({
  name     : "messages",
  initialState,
  reducers : {
    requestGetInitialMessages(state, { payload: { chatId } }: PayloadAction<ActionByChatIdPayload>) {
      state.chatMap[chatId] = {
        ...defaultState,
        data : {
          messagesMap : defaultState.data.messagesMap,
        },
        initialError         : null,
        initialLoadingStatus : "pending",
      };
    },
    successGetInitialMessages(state, { payload }: PayloadAction<GetInitialMessagesDTO>) {
      const { messages, chatId } = payload;
      const targetChat = state.chatMap[chatId];

      targetChat.data.messagesMap = messages.reduce(
        (acc, message) => ({ ...acc, [message.id]: message }),
        {} as Record<Message["id"], Message>,
      );

      targetChat.initialLoadingStatus = "success";
    },

    failureGetInitialMessages(state, { payload: { chatId, error } }: PayloadAction<ErrorPayload>) {
      const targetChat = state.chatMap[chatId];
      if (targetChat) {
        targetChat.initialError = error;
        targetChat.initialLoadingStatus = "failure";
      } else {
        state.chatMap[chatId] = {
          ...defaultState,
          data : {
            messagesMap : defaultState.data.messagesMap,
          },
          initialError         : error,
          initialLoadingStatus : "failure",
        };
      }
    },

    addMessage(state, { payload }: PayloadAction<AddMessage>) {
      const { chatId, message } = payload;
      const targetChat = state.chatMap[chatId];
      if (!targetChat) return;
      const targetMessageId = message.id;
      const foundMessage = targetChat.data.messagesMap[targetMessageId];

      const targetMessageMap = targetChat.data.messagesMap;
      if (foundMessage) {
        targetMessageMap[targetMessageId] = { ...foundMessage, ...payload.message };
      } else {
        targetMessageMap[targetMessageId] = payload.message;
      }
    },
  },
});

export const {
  requestGetInitialMessages,
  failureGetInitialMessages,
  successGetInitialMessages,
  addMessage,
} = messagesSlice.actions;
