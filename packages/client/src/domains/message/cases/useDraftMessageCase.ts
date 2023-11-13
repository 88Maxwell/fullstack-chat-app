import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { ClientChat, Message } from "@chat-app/types";
import { emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { selectDraftMessageByChatId } from "../store/draftMessage/draftMessageSelectors";
import { resetDraftMessages as resetDraftMessagesAction, updateDraftMessageByChatId } from "../store/draftMessage";

export function useDraftMessageCase(chatId?: ClientChat["id"]) {
  const dispatch = useTypedDispatch();
  const draftMessage = useTypedSelector((st) => selectDraftMessageByChatId(st, chatId));

  const updateDraftMessage = (messageText: Message["text"]) => chatId && dispatch(updateDraftMessageByChatId({ chatId, text: messageText }));
  const resetDraftMessages = () => dispatch(resetDraftMessagesAction());
  const sendMessage = () => {
    if (chatId) dispatch(emitMessageAction({ chatId, text: draftMessage }));
    updateDraftMessage("");
  };

  return {
    state : {
      draftMessage,
    },
    actions : {
      updateDraftMessage,
      resetDraftMessages,
      sendMessage,
    },
  };
}
