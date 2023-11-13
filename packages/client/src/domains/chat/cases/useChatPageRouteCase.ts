import { useParams } from "react-router-dom";

export function useChatPageRouteCase() {
  const locationParams = useParams<{ chatId: string }>();

  const currentChatId = locationParams.chatId;

  return {
    state : { currentChatId },
  };
}
