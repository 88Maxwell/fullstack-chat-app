import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "app/store";

// BASE
const selectChatsDrawerRoot = (state: AppState) => state.chatsDrawer;
export const selectIsChatsDrawerShown = createSelector(selectChatsDrawerRoot, (st) => st.isShown);
