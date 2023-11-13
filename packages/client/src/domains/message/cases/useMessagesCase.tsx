import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import {
  selectMessages,
} from "domains/message/store/messages/getMessagesSelectors";
import { ClientChat } from "@chat-app/types";

export function useMessagesCase(chatId: ClientChat["id"]) {
  const messages = useTypedSelector((st) => selectMessages(st, chatId));

  return {
    state   : { messages },
    actions : {},
  };
}
