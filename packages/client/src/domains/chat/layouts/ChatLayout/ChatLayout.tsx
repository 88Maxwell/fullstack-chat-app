import React from "react";
import { ChatLayoutProps } from "./ChatLayoutTypes";
import styles from "./ChatLayout.module.scss";

function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div>
      <header className={styles.header}>
        <h1>Chat bots 2.0</h1>
      </header>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

export default ChatLayout;
