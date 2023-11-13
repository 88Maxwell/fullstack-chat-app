import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { ClientChat } from "@chat-app/types";
import { selectChatById } from "../store/getChats";

export function useChatCase(chatId: ClientChat["id"]) {
  const chat = useTypedSelector((st) => selectChatById(st, chatId));
  return {
    state : {
      chat,
      currentChatId : chatId,
    },
  };
}
