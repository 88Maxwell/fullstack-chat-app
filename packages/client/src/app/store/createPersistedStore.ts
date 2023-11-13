import { History } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { Services } from "services";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { createCombinedReducer } from "./createCombinedReducer";
import { getSocketServiceMiddleware } from "../middlewares";

export interface AppThunkContext {
  services: Omit<Services, "socketService">;
}
interface CreatePersistedStoreParams {
  thunkContext: AppThunkContext;
}

export function createPersistedStore(
  history: History,
  { thunkContext }: CreatePersistedStoreParams,
) {
  const routerMiddleware = createRouterMiddleware(history);
  const { rootReducer } = createCombinedReducer(history);

  const store = configureStore({
    reducer    : rootReducer,
    middleware : (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        immutableCheck    : false,
        serializableCheck : false,
        thunk             : { extraArgument: thunkContext },
      });
      const socketServiceMiddleware = getSocketServiceMiddleware(thunkContext);

      return defaultMiddleware.concat(routerMiddleware, socketServiceMiddleware);
    },
  });

  return store;
}
