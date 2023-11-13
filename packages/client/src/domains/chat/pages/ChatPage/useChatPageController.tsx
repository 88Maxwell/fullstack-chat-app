import { useChatCase } from "domains/chat/cases/useChatCase";
import { useChatPageRouteCase } from "domains/chat/cases/useChatPageRouteCase";

export function useChatPageController() {
  const { state: { currentChatId } } = useChatPageRouteCase();
  const { state: { chat } } = useChatCase(currentChatId);

  return { state: { chat } };
}
