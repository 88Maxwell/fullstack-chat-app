import { ClientChat } from "@chat-app/types";

export interface ChatListItemProps {
  chat: ClientChat;
  className?: string;
  selected: boolean;
}
