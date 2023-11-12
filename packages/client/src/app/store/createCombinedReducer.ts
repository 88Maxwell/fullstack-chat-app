import { connectRouter } from "connected-react-router";
import { chatsSlice } from "domains/chat/store/getChats";
import { History } from "history";
import { combineReducers } from "redux";

export function createCombinedReducer(history: History) {
  const rootReducer = combineReducers({
    router            : connectRouter(history),
    [chatsSlice.name] : chatsSlice.reducer,
  });

  return { rootReducer };
}
