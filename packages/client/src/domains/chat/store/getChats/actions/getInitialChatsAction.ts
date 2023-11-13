import type { AppDispatch, AppState, AppThunkContext } from "app/store";
import reportError from "domains/common/utils/reportError";
import { ClientChat } from "@chat-app/types";
import {
  failureGetChats,
  requestGetChats,
  setChatsStatusSuccess,
  successGetChats,
} from "../getChatsSlice";
import { addChatToListAction } from "./addChatToListAction";
import { selectChatsFilters } from "../chatsSelectors";

export const getInitialChatsAction = (additionalChatId?: ClientChat["id"]) => async (dispatch: AppDispatch, getState: () => AppState, { services }: AppThunkContext) => {
  try {
    dispatch(requestGetChats());
    const state = getState();
    const chatsFilters = selectChatsFilters(state);

    const [res] = await Promise.allSettled([
      services.apiService.chatApi.getChats({
        userNameFilter   : chatsFilters?.userName,
        userStatusFilter : chatsFilters?.userStatus,
      }),
      additionalChatId ? dispatch(addChatToListAction({ chatId: additionalChatId, switchToChat: false }))
        .then(() => dispatch(setChatsStatusSuccess()))
        : undefined,
    ]);

    if (res.status === "rejected") throw new Error(res.reason);

    dispatch(successGetChats({ chats: res.value.chats }));
  } catch (error) {
    dispatch(failureGetChats(error));
    reportError(error);
  }
};
