import React from "react";
import clsx from "clsx";
import { ChatListProps } from "./ChatListTypes";
import styles from "./ChatList.module.scss";

function ChatList({ children, className }: ChatListProps) {
  return (
    <div className={clsx(styles.chatList, className)}>{children}</div>
  );
}

export default ChatList;
