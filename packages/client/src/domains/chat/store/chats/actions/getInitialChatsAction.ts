import type { AppDispatch, AppState, AppThunkContext } from "app/store";
import reportError from "domains/common/utils/reportError";
import {
  failureGetChats,
  requestGetChats,
  successGetChats,
} from "../chatsSlice";
import { selectChatsFilters } from "../chatsSelectors";

// eslint-disable-next-line max-len
export const getInitialChatsAction = () => async (dispatch: AppDispatch, getState: () => AppState, { services }: AppThunkContext) => {
  try {
    dispatch(requestGetChats());
    const state = getState();
    const chatsFilters = selectChatsFilters(state);

    const { chats } = await services.apiService.chatApi.getChats({
      userNameFilter   : chatsFilters?.userName,
      userStatusFilter : chatsFilters?.userStatus,
    });

    dispatch(successGetChats({ chats }));
  } catch (error) {
    dispatch(failureGetChats(error));
    reportError(error);
  }
};
