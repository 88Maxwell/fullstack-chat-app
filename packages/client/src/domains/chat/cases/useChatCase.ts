// import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { Chat } from "@chat-app/types";
import { selectChatById } from "../store/getChats";

export function useChatCase(chatId: Chat["id"]) {
//   const dispatch = useTypedDispatch();

  const chat = useTypedSelector((st) => selectChatById(st, chatId));

  return {
    state : { chat },
  };
}
