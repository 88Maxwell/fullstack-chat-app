/* eslint-disable max-len */
import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import {
  getInitialChatsAction,
  selectChats,
  selectChatsUserNameFilter,
  selectChatsUserStatusFilter,
  selectIsChatsLoading,
  setStatusFilterAll as setStatusFilterAllAction,
  setStatusFilterOnline as setStatusFilterOnlineAction,
  setChatsUserNameFilter as setChatsUserNameFilterAction,
} from "../store/getChats";

export function useChatsCase() {
  const dispatch = useTypedDispatch();

  const chats = useTypedSelector(selectChats);
  const chatsUserNameFilter = useTypedSelector(selectChatsUserNameFilter);
  const chatsUserStatusFilter = useTypedSelector(selectChatsUserStatusFilter);
  const isChatsLoading = useTypedSelector(selectIsChatsLoading);

  const getInitialChats = (...args: Parameters<typeof getInitialChatsAction>) => dispatch(getInitialChatsAction(...args));
  const setStatusFilterAll = (...args: Parameters<typeof setStatusFilterAllAction>) => dispatch(setStatusFilterAllAction(...args));
  const setStatusFilterOnline = (...args: Parameters<typeof setStatusFilterOnlineAction>) => dispatch(setStatusFilterOnlineAction(...args));
  const setChatsUserNameFilter = (...args: Parameters<typeof setChatsUserNameFilterAction>) => dispatch(setChatsUserNameFilterAction(...args));

  return {
    state : {
      chats,
      chatsUserNameFilter,
      chatsUserStatusFilter,
    },
    booleans : { isChatsLoading },
    actions  : {
      getInitialChats,
      setStatusFilterOnline,
      setStatusFilterAll,
      setChatsUserNameFilter,
    },
  };
}
