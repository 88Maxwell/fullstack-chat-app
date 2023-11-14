import { Chat } from "@chat-app/types";
import { useDraftMessageCase } from "domains/message/cases/useDraftMessageCase";
import { useMessagesCase } from "domains/message/cases/useMessagesCase";

export function useChatSectionController(chat: Chat) {
  const {
    state : {
      draftMessage,
    },
    actions : {
      updateDraftMessage,
      sendMessage,
    },
  } = useDraftMessageCase(chat.id);
  const { state: { messages } } = useMessagesCase(chat.id);

  const handleChangeDraftMessage = (e: React.ChangeEvent<HTMLInputElement>) => updateDraftMessage(e.target.value);
  const handleSendMessageOnKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    const isKeyEnter = e?.key === "Enter";

    if (!isKeyEnter) return;
    if (!e?.ctrlKey) {
      e?.preventDefault();
      sendMessage();
    } else {
      updateDraftMessage(`${draftMessage}\r\n`);
    }
  };

  return {
    state : {
      messages,
      draftMessage,
    },
    actions : {
      handleSendMessageOnKeyDown,
      handleChangeDraftMessage,
      handleSendMessage : sendMessage,
    },
  };
}
