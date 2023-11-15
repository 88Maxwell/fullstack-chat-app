/* eslint-disable no-param-reassign, @typescript-eslint/naming-convention */
import { createSlice } from "@reduxjs/toolkit";

const initialState: { isShown: boolean } = {
  isShown : false,
};

export const chatsDrawerSlice = createSlice({
  name     : "chatsDrawer",
  initialState,
  reducers : {
    showChatsDrawer(state) {
      state.isShown = true;
    },
    hideChatsDrawer(state) {
      state.isShown = false;
    },
  },
});

export const {
  showChatsDrawer,
  hideChatsDrawer,
} = chatsDrawerSlice.actions;
