import clsx from "clsx";
import { Link } from "react-router-dom";
import { ChatListItemProps } from "./ChatListItemTypes";
import styles from "./ChatListItem.module.scss";

function ChatListItem({ chat, className, selected }: ChatListItemProps) {
  return (
    <li className={clsx(className, {
      [styles.chatListItemOnline]  : chat.user.status === "online",
      [styles.chatListItemOffline] : chat.user.status === "offline",
    })}
    >
      <Link to={`/chat/${chat.id}`}>
        <div className={clsx(styles.chatListItem, { [styles.chatListItemSelected]: selected })}>
          <div className={styles.chatListItemAvatar}>
            <img
              // className={clsx(styles.chatListItemAvatar)}
              src={chat.user.avatar?.urls?.small}
              alt={chat.user.avatar?.alt}
            />
          </div>
          <div className={styles.chatListItemTypographyContainer}>
            <h4 className={styles.chatListItemPrimary}>{chat.user.name}</h4>
            <p className={styles.chatListItemSecondary}>{chat.lastMessage?.text}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ChatListItem;
