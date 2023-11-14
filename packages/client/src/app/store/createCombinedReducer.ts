import { connectRouter } from "connected-react-router";
import { chatsSlice } from "domains/chat/store/chats";
import { draftMessageSlice } from "domains/message/store/draftMessage";
import { messagesSlice } from "domains/message/store/messages/messagesSlice";
import { History } from "history";
import { combineReducers } from "redux";

export function createCombinedReducer(history: History) {
  const rootReducer = combineReducers({
    router                   : connectRouter(history),
    [chatsSlice.name]        : chatsSlice.reducer,
    [draftMessageSlice.name] : draftMessageSlice.reducer,
    [messagesSlice.name]     : messagesSlice.reducer,

  });

  return { rootReducer };
}
