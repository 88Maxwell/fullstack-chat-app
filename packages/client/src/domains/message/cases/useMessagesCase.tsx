import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import {
  selectMessages,
} from "domains/message/store/messages/messagesSelectors";
import { Chat } from "@chat-app/types";

export function useMessagesCase(chatId: Chat["id"]) {
  const messages = useTypedSelector((st) => selectMessages(st, chatId));

  return {
    state   : { messages },
    actions : {},
  };
}
