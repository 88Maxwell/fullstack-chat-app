import React from "react";
import clsx from "clsx";
import If from "domains/common/components/If";
import { ChatListSectionProps } from "./ChatListSectionTypes";
import { useChatListSectionController } from "./useChatListSectionController";
import ChatListItem from "../ChatListItem/ChatListItem";

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
    <div>
      <div>
        <div>
          <button type="button" onChange={handleSetStatusFilterOnline}>Online</button>
          <button type="button" onChange={handleSetStatusFilterAll}>All</button>
        </div>
        <If condition={!isChatsLoading} else="...loading">
          <ul className={clsx(className)}>
            {chats.map((c) => <ChatListItem key={`chat-list-item-${c.id}`} chat={c} />)}
          </ul>
        </If>
        <input type="text" value={chatsUserNameFilter} onChange={handleChangeUserName} />
      </div>
    </div>
  );
}

export default ChatListSection;
