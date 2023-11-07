import { configureStore } from "@reduxjs/toolkit";
import { createCombinedReducer } from "./createCombinedReducer";
import { getSocketServiceMiddleware } from "../middlewares";

export function createPersistedStore() {
  const { rootReducer } = createCombinedReducer();
  const store = configureStore({
    reducer    : rootReducer,
    middleware : (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        immutableCheck    : false,
        serializableCheck : false,
      });
      const socketServiceMiddleware = getSocketServiceMiddleware();

      return defaultMiddleware.concat(socketServiceMiddleware);
    },
  });

  return store;
}
