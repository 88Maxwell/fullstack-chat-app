import clsx from "clsx";
import { MessageListProps } from "./MessageListTypes";
import styles from "./MessageList.module.scss";

function MessageList({ children, className }: MessageListProps) {
  return (
    <ul className={clsx(styles.messageList, className)}>{children}</ul>
  );
}

export default MessageList;
