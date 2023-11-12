import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import {
  getInitialChatsAction,
  selectChats,
  selectChatsUserNameFilter,
  selectChatsUserStatusFilter,
  selectIsChatsLoading,
} from "../store/getChats";

export function useChatsCase() {
  const dispatch = useTypedDispatch();

  const chats = useTypedSelector(selectChats);
  const chatsUserNameFilter = useTypedSelector(selectChatsUserNameFilter);
  const chatsUserStatusFilter = useTypedSelector(selectChatsUserStatusFilter);
  const isChatsLoading = useTypedSelector(selectIsChatsLoading);

  // eslint-disable-next-line max-len
  const onGetInitialChats = (...args: Parameters<typeof getInitialChatsAction>) => dispatch(getInitialChatsAction(...args));

  return {
    state : {
      chats,
      chatsUserNameFilter,
      chatsUserStatusFilter,
    },
    booleans : { isChatsLoading },
    actions  : { onGetInitialChats },
  };
}
