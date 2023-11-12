import React from "react";
import clsx from "clsx";
import If from "domains/common/components/If";
import Tabs from "domains/common/components/Tabs";
import Tab from "domains/common/components/Tab";
import { ChatListSectionProps } from "./ChatListSectionTypes";
import { useChatListSectionController } from "./useChatListSectionController";
import ChatListItem from "../ChatListItem";
import styles from "./ChatListSection.module.scss";
import ChatList from "../ChatList";

function ChatListSection({ className }: ChatListSectionProps) {
  const {
    state    : { chats, chatsUserNameFilter, chatsUserStatusFilter },
    booleans : { isChatsLoading },
    actions  : {
      handleSetStatusFilterOnline,
      handleSetStatusFilterAll,
      handleChangeUserName,
    },
  } = useChatListSectionController();

  return (
    <aside className={clsx(styles.chatListSection, className)}>
      <Tabs>
        <Tab selected={chatsUserStatusFilter === "online"} onClick={handleSetStatusFilterOnline}>Online</Tab>
        <Tab selected={!chatsUserStatusFilter} onClick={handleSetStatusFilterAll}>All</Tab>
      </Tabs>
      <div className={styles.chatListContainer}>
        <If condition={!isChatsLoading} else="...loading">
          <ChatList>
            {chats.map((c) => <ChatListItem selected={false} className={styles.chatListItem} key={`chat-list-item-${c.id}`} chat={c} />)}
          </ChatList>
        </If>
      </div>
      <input type="text" value={chatsUserNameFilter} onChange={handleChangeUserName} />
    </aside>
  );
}

export default ChatListSection;
