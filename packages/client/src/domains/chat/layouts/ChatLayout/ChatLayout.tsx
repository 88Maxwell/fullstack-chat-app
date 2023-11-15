import React from "react";
import { useChatsDrawerCase } from "domains/chat/cases/useChatsDrawerCase";
import Button from "domains/common/components/Button";
import ChatsDrawer from "domains/chat/components/ChatsDrawer/ChatsDrawer";
import { ChatLayoutProps } from "./ChatLayoutTypes";
import styles from "./ChatLayout.module.scss";

function ChatLayout({ children }: ChatLayoutProps) {
  const { actions: { handleToogleChatsDrawer } } = useChatsDrawerCase();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Chat bots 2.0</h1>
        <Button className={styles.drawerButton} onClick={handleToogleChatsDrawer}>Chats</Button>
      </header>
      <div className={styles.container}>
        {children}
      </div>
      <ChatsDrawer />
    </div>
  );
}

export default ChatLayout;
