// import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { selectChatById } from "../store/getChats";
import { Chat } from "../entity";

export function useChatCase(chatId: Chat["id"]) {
//   const dispatch = useTypedDispatch();

  const chat = useTypedSelector((st) => selectChatById(st, chatId));

  return {
    state : { chat },
  };
}
