import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { Chat, Message } from "@chat-app/types";
import { emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { selectDraftMessageByChatId } from "../store/draftMessage/draftMessageSelectors";
import { resetDraftMessages as resetDraftMessagesAction, updateDraftMessageByChatId } from "../store/draftMessage";

export function useDraftMessageCase(chatId: Chat["id"]) {
  const dispatch = useTypedDispatch();
  const draftMessage = useTypedSelector((st) => selectDraftMessageByChatId(st, chatId));

  const updateDraftMessage = (messageText: Message["text"]) => chatId && dispatch(updateDraftMessageByChatId({ chatId, text: messageText }));
  const resetDraftMessages = () => dispatch(resetDraftMessagesAction());
  const sendMessage = () => {
    const isAllCharsAreSpaces = [...draftMessage].every((char) => char === " ");
    if (isAllCharsAreSpaces || !draftMessage) return;
    dispatch(emitMessageAction({ chatId, text: draftMessage }));
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
