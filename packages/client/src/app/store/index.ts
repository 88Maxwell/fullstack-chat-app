import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { store, services, history } from "./createEntrypoint";
import type { AppThunkContext as AppThunkCtx } from "./createPersistedStore";

export { store, services, history };

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkContext = AppThunkCtx;
export type AppThunk = ThunkAction<
Promise<unknown>,
AppState,
AppThunkContext,
AnyAction
>;
