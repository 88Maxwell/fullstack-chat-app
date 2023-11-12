import clsx from "clsx";
import { ChatListItemProps } from "./ChatListItemTypes";
import styles from "./ChatListItem.module.scss";

function ChatListItem({ chat, className }: ChatListItemProps) {
  return (
    <li className={clsx(styles.chatListItem, className)}>
      <img
        className={styles.chatListItemAvatar}
        src={chat.user.avatar?.urls?.small}
        alt={chat.user.avatar?.alt}
      />
      <div className={styles.chatListItemTypographyContainer}>
        <h4 className={styles.chatListItemPrimary}>{chat.user.name}</h4>
        <p className={styles.chatListItemSecondary}>{chat.lastMessage?.text}</p>
      </div>
    </li>
  );
}

export default ChatListItem;
