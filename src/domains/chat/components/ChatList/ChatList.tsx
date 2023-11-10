import React from "react";
import clsx from "clsx";
import { ChatListProps } from "./ChatListTypes";

function ChatList({ children, className }: ChatListProps) {
  return <ul className={clsx(className)}>{children}</ul>;
}

export default ChatList;
