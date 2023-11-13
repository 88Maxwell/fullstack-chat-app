/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraftMessageState, UpdateDraftMessageByChatIdPayload } from "./draftMessageTypes";

const initialState: DraftMessageState = {
  draftMessageMap : {},
};

export const draftMessageSlice = createSlice({
  name     : "draftMessage",
  initialState,
  reducers : {
    updateDraftMessageByChatId(state, { payload }: PayloadAction<UpdateDraftMessageByChatIdPayload>) {
      const { chatId, text } = payload;
      state.draftMessageMap[chatId] = text;
    },
    resetDraftMessages(state) {
      state.draftMessageMap = {};
    },
  },
});

export const { updateDraftMessageByChatId, resetDraftMessages } = draftMessageSlice.actions;
