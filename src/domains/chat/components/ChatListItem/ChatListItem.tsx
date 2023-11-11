import clsx from "clsx";
import { ChatListItemProps } from "./ChatListItemTypes";

function ChatListItem({ chat, className }: ChatListItemProps) {
  return (
    <li className={clsx(className)}>ChatListItem</li>
  );
}

export default ChatListItem;
