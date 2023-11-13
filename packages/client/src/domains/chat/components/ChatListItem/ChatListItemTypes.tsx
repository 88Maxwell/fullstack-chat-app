import { Chat } from "@chat-app/types";

export interface ChatListItemProps {
  chat: Chat;
  className?: string;
  selected: boolean;
}
