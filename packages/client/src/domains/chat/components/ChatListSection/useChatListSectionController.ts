import { useChatsCase } from "domains/chat/cases/useChatsCase";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useChatListSectionController() {
  const {
    state: { chats, chatsUserNameFilter, chatsUserStatusFilter },
    booleans: { isChatsLoading },
    actions : {
      getInitialChats,
      setStatusFilterOnline,
      setStatusFilterAll,
      setChatsUserNameFilter,
    },
  } = useChatsCase();
  const getInitialChatsDebounced = useDebouncedCallback(getInitialChats, 2500);

  useEffect(() => {
    getInitialChats();
  }, []);

  const handleSetStatusFilterOnline = () => {
    setStatusFilterOnline();
    getInitialChats();
  };
  const handleSetStatusFilterAll = () => {
    setStatusFilterAll();
    getInitialChats();
  };
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatsUserNameFilter(e.target.value);
    getInitialChatsDebounced();
  };

  return {
    state    : { chats, chatsUserNameFilter, chatsUserStatusFilter },
    booleans : { isChatsLoading },
    actions  : {
      handleSetStatusFilterOnline,
      handleSetStatusFilterAll,
      handleChangeUserName,
    },
  };
}
