import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

export function createCombinedReducer(history: History) {
  const rootReducer = combineReducers({
    router : connectRouter(history),
  });

  return { rootReducer };
}
