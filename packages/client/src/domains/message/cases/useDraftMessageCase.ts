import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { Chat, Message, User } from "@chat-app/types";
import { emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { selectDraftMessageByChatId } from "../store/draftMessage/draftMessageSelectors";
import { resetDraftMessages as resetDraftMessagesAction, updateDraftMessageByChatId } from "../store/draftMessage";

export function useDraftMessageCase(chatId?: Chat["id"]) {
  const dispatch = useTypedDispatch();
  const draftMessage = useTypedSelector((st) => selectDraftMessageByChatId(st, chatId));

  const updateDraftMessage = (messageText: Message["text"]) => chatId && dispatch(updateDraftMessageByChatId({ chatId, text: messageText }));
  const resetDraftMessages = () => dispatch(resetDraftMessagesAction());
  const sendMessage = (userId: User["id"]) => {
    dispatch(emitMessageAction({ userId, text: draftMessage }));
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
